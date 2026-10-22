// Notification envoyée par Orange (notif_url) quand un paiement change d'état.
// On ne se fie pas au contenu reçu : on retrouve la commande par son notif_token,
// puis on redemande à Orange l'état réel du paiement avant de la marquer payée.
const om = require('../lib/orange-money');

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST') return om.json(405, { error: 'method_not_allowed' });
  if(!om.isConfigured()) return om.json(503, { error: 'not_configured' });
  let notifToken = '';
  try{ notifToken = String(JSON.parse(event.body || '{}').notif_token || ''); }catch(e){ /* corps invalide */ }
  if(!notifToken) return om.json(400, { error: 'missing_token' });

  try{
    const order = await om.getOrder(`notif_token=eq.${encodeURIComponent(notifToken)}`);
    if(!order) return om.json(404, { error: 'order_not_found' });
    const status = await om.syncPaymentStatus(order);
    return om.json(200, { status });
  }catch(e){
    console.error('pay-notify', e);
    return om.json(502, { error: 'sync_failed' });
  }
};
