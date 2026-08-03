// Edge Function — alerte l'équipe (push navigateur + email) quand une commande
// arrive ou est annulée. Contrairement à send-push, cette fonction est appelée
// par n'importe qui (la cliente qui vient de commander n'est pas connectée en
// tant qu'équipe) : elle est donc protégée par idempotence (chaque commande ne
// déclenche qu'une seule fois chaque type d'alerte, via notified_new /
// notified_cancel) plutôt que par une authentification.
//
// Déploiement (depuis votre ordinateur, à la racine du projet) :
//   npx supabase functions deploy notify-team
//
// Secrets déjà définis pour send-push (réutilisés ici) :
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
//
// Secrets optionnels pour l'email (voir NOTIFICATIONS.md) :
//   RESEND_API_KEY, NOTIFY_EMAIL, NOTIFY_FROM

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import webpush from 'https://esm.sh/web-push@3.6.7';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { event, orderId } = await req.json();
    if (!orderId || (event !== 'new_order' && event !== 'order_cancelled')) {
      return json({ error: 'event et orderId sont requis' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: order } = await supabase
      .from('orders').select('*').eq('id', orderId).maybeSingle();
    if (!order) return json({ error: 'Commande introuvable' }, 404);

    const flagCol = event === 'new_order' ? 'notified_new' : 'notified_cancel';
    if (order[flagCol]) return json({ sent: 0, already: true });

    const title = event === 'new_order' ? 'Nouvelle commande' : 'Commande annulée';
    const body = event === 'new_order'
      ? `${order.customer} — ${order.total} GNF`
      : `Commande de ${order.customer} annulée (${order.total} GNF)`;

    let sent = 0;
    const vapidPublic = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivate = Deno.env.get('VAPID_PRIVATE_KEY');
    if (vapidPublic && vapidPrivate) {
      webpush.setVapidDetails(
        Deno.env.get('VAPID_SUBJECT') ?? 'mailto:contact@example.com',
        vapidPublic,
        vapidPrivate,
      );
      const { data: subs } = await supabase
        .from('team_push_subscribers').select('id,endpoint,p256dh,auth');
      const payload = JSON.stringify({ title, body, url: '/' });
      const stale: string[] = [];
      for (const s of subs ?? []) {
        try {
          await webpush.sendNotification(
            { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
            payload,
          );
          sent++;
        } catch (e) {
          const status = (e as { statusCode?: number }).statusCode;
          if (status === 404 || status === 410) stale.push(s.id);
        }
      }
      if (stale.length) await supabase.from('team_push_subscribers').delete().in('id', stale);
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    const notifyEmail = Deno.env.get('NOTIFY_EMAIL');
    let emailed = false;
    if (resendKey && notifyEmail) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: Deno.env.get('NOTIFY_FROM') || 'Joda Boutique <onboarding@resend.dev>',
          to: notifyEmail,
          subject: `Joda Boutique — ${title}`,
          text: `${body}\n\nCommande : ${order.id}\nCliente : ${order.customer}\nTéléphone : ${order.phone || '—'}\nAdresse : ${order.address || '—'}`,
        }),
      });
      emailed = res.ok;
    }

    await supabase.from('orders').update({ [flagCol]: true }).eq('id', orderId);
    return json({ sent, emailed });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
