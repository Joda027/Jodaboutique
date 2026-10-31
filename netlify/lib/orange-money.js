// Outils partagés du paiement en ligne Orange Money (Web Payment).
// Toutes les clés restent côté serveur, dans les variables d'environnement Netlify :
//   OM_AUTH_HEADER            valeur « Authorization header » fournie par Orange (Basic …, sans le mot Basic)
//   OM_MERCHANT_KEY           clé marchand Orange Money
//   OM_API_PATH               ex. orange-money-webpay/dev/v1 (test) ou le chemin Guinée donné par Orange
//   OM_CURRENCY               GNF en production (OUV dans l'environnement de test Orange)
//   OM_TOKEN_URL              optionnel, défaut https://api.orange.com/oauth/v3/token
//   SUPABASE_SERVICE_ROLE_KEY clé « service_role » Supabase (pour mettre à jour la commande)
//   SITE_URL                  optionnel, défaut https://jodaboutique.com

const SUPABASE_URL = 'https://sfkxhelutkoqinmfceyc.supabase.co';
const SITE_URL = (process.env.SITE_URL || 'https://jodaboutique.com').replace(/\/$/, '');
const OM_API_BASE = 'https://api.orange.com/';

function isConfigured(){
  return !!(process.env.OM_AUTH_HEADER && process.env.OM_MERCHANT_KEY && process.env.OM_API_PATH
    && process.env.OM_CURRENCY && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function json(statusCode, body){
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) };
}

async function supabase(path, options = {}){
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...(options.headers || {}) }
  });
  const text = await res.text();
  if(!res.ok) throw new Error(`Supabase ${res.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

async function getOrder(filter){
  const rows = await supabase(`orders?${filter}&select=id,total,delivery_fee,payment_method,payment_status,pay_token,notif_token&limit=1`);
  return Array.isArray(rows) ? rows[0] : null;
}

function updateOrder(id, fields){
  return supabase(`orders?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(fields) });
}

// Montant réellement dû, toujours recalculé depuis la base (jamais depuis le navigateur).
function amountDue(order){
  return Math.round(Number(order.total || 0) + Number(order.delivery_fee || 0));
}

async function orangeToken(){
  const res = await fetch(process.env.OM_TOKEN_URL || 'https://api.orange.com/oauth/v3/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${process.env.OM_AUTH_HEADER}`, Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials'
  });
  const data = await res.json().catch(()=> ({}));
  if(!res.ok || !data.access_token) throw new Error(`Jeton Orange refusé (${res.status})`);
  return data.access_token;
}

async function orangePost(endpoint, body){
  const token = await orangeToken();
  const res = await fetch(`${OM_API_BASE}${process.env.OM_API_PATH.replace(/^\/|\/$/g, '')}/${endpoint}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(()=> ({}));
  if(!res.ok) throw new Error(`Orange ${endpoint} ${res.status}: ${data.description || data.message || ''}`);
  return data;
}

// Demande à Orange l'état réel du paiement et met la commande à jour.
// Renvoie le statut de paiement de la commande : 'en attente', 'reçu' ou 'échoué'.
async function syncPaymentStatus(order){
  if(order.payment_status !== 'en attente' || !order.pay_token) return order.payment_status;
  const data = await orangePost('transactionstatus', { order_id: order.id, amount: amountDue(order), pay_token: order.pay_token });
  const status = String(data.status || '').toUpperCase();
  if(status === 'SUCCESS'){
    await updateOrder(order.id, { payment_status: 'reçu', payment_ref: data.txnid || null });
    return 'reçu';
  }
  if(status === 'FAILED' || status === 'EXPIRED'){
    await updateOrder(order.id, { payment_status: 'échoué' });
    return 'échoué';
  }
  return 'en attente';
}

module.exports = { SITE_URL, isConfigured, json, getOrder, updateOrder, amountDue, orangePost, syncPaymentStatus };
