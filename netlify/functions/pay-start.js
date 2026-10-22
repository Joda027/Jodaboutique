// Démarre un paiement en ligne Orange Money pour une commande déjà enregistrée.
// POST { orderId } → { paymentUrl } : la cliente est redirigée vers la page Orange.
const om = require('../lib/orange-money');

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST') return om.json(405, { error: 'method_not_allowed' });
  if(!om.isConfigured()) return om.json(503, { error: 'not_configured' });
  let orderId = '';
  try{ orderId = String(JSON.parse(event.body || '{}').orderId || ''); }catch(e){ /* corps invalide */ }
  if(!orderId) return om.json(400, { error: 'missing_order' });

  try{
    const order = await om.getOrder(`id=eq.${encodeURIComponent(orderId)}`);
    if(!order || order.payment_method !== 'en_ligne') return om.json(404, { error: 'order_not_found' });
    if(order.payment_status !== 'en attente') return om.json(409, { error: 'already_' + order.payment_status });

    const back = `${om.SITE_URL}/?commande=${encodeURIComponent(order.id)}`;
    const data = await om.orangePost('webpayment', {
      merchant_key: process.env.OM_MERCHANT_KEY,
      currency: process.env.OM_CURRENCY,
      order_id: order.id,
      amount: om.amountDue(order),
      return_url: `${back}&paiement=retour`,
      cancel_url: `${back}&paiement=annule`,
      notif_url: `${om.SITE_URL}/.netlify/functions/pay-notify`,
      lang: 'fr',
      reference: 'Joda Boutique'
    });
    if(!data.payment_url) throw new Error('Réponse Orange sans payment_url');
    await om.updateOrder(order.id, { pay_token: data.pay_token || null, notif_token: data.notif_token || null });
    return om.json(200, { paymentUrl: data.payment_url });
  }catch(e){
    console.error('pay-start', e);
    return om.json(502, { error: 'payment_start_failed' });
  }
};
