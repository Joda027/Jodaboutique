// Edge Function — envoie une notification push à tous les abonnés.
//
// Déploiement (depuis votre ordinateur, à la racine du projet) :
//   npx supabase functions deploy send-push
//
// Secrets à définir une seule fois :
//   npx supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:vous@exemple.com

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
    const { title, body, url, orderId } = await req.json();
    if (!title || !body) return json({ error: 'title et body sont requis' }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Vérifie que l'appelant est bien un membre de l'équipe.
    const authHeader = req.headers.get('Authorization') ?? '';
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(jwt);
    if (!user) return json({ error: 'Non autorisé' }, 401);

    const { data: member } = await supabase
      .from('team_members').select('id').eq('auth_user_id', user.id).maybeSingle();
    if (!member) return json({ error: 'Non autorisé' }, 401);

    webpush.setVapidDetails(
      Deno.env.get('VAPID_SUBJECT') ?? 'mailto:contact@example.com',
      Deno.env.get('VAPID_PUBLIC_KEY')!,
      Deno.env.get('VAPID_PRIVATE_KEY')!,
    );

    // orderId défini => notification ciblée sur une commande ; sinon, diffusion à tous.
    let query = supabase.from('push_subscribers').select('id,endpoint,p256dh,auth');
    if (orderId) query = query.eq('order_id', orderId);
    const { data: subs, error } = await query;
    if (error) return json({ error: error.message }, 500);

    const payload = JSON.stringify({ title, body, url: url ?? '/' });
    let sent = 0;
    const stale: string[] = [];

    for (const s of subs ?? []) {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          payload,
        );
        sent++;
      } catch (e) {
        // 404/410 => l'abonnement n'est plus valide, on le supprime.
        const status = (e as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) stale.push(s.id);
      }
    }

    if (stale.length) await supabase.from('push_subscribers').delete().in('id', stale);

    return json({ sent, removed: stale.length });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
