// État du paiement en ligne d'une commande, pour la page de retour de la cliente.
// GET ?commande=ID → { status: 'en attente' | 'reçu' | 'échoué' }
// Interroge aussi Orange si la notification n'est pas encore arrivée.
const om = require('../lib/orange-money');

exports.handler = async (event) => {
  if(!om.isConfigured()) return om.json(503, { error: 'not_configured' });
  const orderId = String((event.queryStringParameters || {}).commande || '');
  if(!orderId) return om.json(400, { error: 'missing_order' });
  try{
    const order = await om.getOrder(`id=eq.${encodeURIComponent(orderId)}`);
    if(!order || order.payment_method !== 'en_ligne') return om.json(404, { error: 'order_not_found' });
    return om.json(200, { status: await om.syncPaymentStatus(order) });
  }catch(e){
    console.error('pay-status', e);
    return om.json(502, { error: 'status_failed' });
  }
};
