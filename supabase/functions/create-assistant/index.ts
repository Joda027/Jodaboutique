// Fonction Edge Supabase : création d'un compte assistante par l'administratrice.
// Utilise la clé service_role (jamais exposée au navigateur) pour créer un
// vrai compte Supabase Auth, après avoir vérifié que l'appelant est admin.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization') || '';

    // Client "appelant" : sert uniquement à vérifier qui fait la demande.
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Non authentifié.' }), { status: 401, headers: corsHeaders });
    }

    const { data: profile, error: profileErr } = await callerClient
      .from('profiles')
      .select('role, active')
      .eq('id', user.id)
      .maybeSingle();

    if (profileErr || !profile || profile.role !== 'admin' || profile.active === false) {
      return new Response(JSON.stringify({ error: "Réservé à l'administratrice." }), { status: 403, headers: corsHeaders });
    }

    const { name, email, password } = await req.json();
    if (!name || !email || !password || String(password).length < 6) {
      return new Response(
        JSON.stringify({ error: 'Nom, email et mot de passe (6 caractères minimum) requis.' }),
        { status: 400, headers: corsHeaders },
      );
    }

    // Client "admin" : clé service_role, agit avec tous les droits.
    const adminClient = createClient(supabaseUrl, serviceKey);

    const { data: created, error: createErr } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createErr || !created.user) {
      return new Response(
        JSON.stringify({ error: createErr?.message || "Impossible de créer le compte." }),
        { status: 400, headers: corsHeaders },
      );
    }

    const { error: insertErr } = await adminClient.from('profiles').insert({
      id: created.user.id,
      name,
      role: 'assistant',
      active: true,
    });
    if (insertErr) {
      // On annule la création du compte Auth si le profil n'a pas pu être créé.
      await adminClient.auth.admin.deleteUser(created.user.id);
      return new Response(JSON.stringify({ error: insertErr.message }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ ok: true, id: created.user.id }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
