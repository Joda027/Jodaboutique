// Fonction Edge Supabase : réinitialisation du mot de passe d'une assistante
// par l'administratrice (utile si elle l'a oublié).
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

    const { userId, password } = await req.json();
    if (!userId || !password || String(password).length < 6) {
      return new Response(
        JSON.stringify({ error: 'Identifiant et mot de passe (6 caractères minimum) requis.' }),
        { status: 400, headers: corsHeaders },
      );
    }

    const adminClient = createClient(supabaseUrl, serviceKey);
    const { error: updateErr } = await adminClient.auth.admin.updateUserById(userId, { password });
    if (updateErr) {
      return new Response(JSON.stringify({ error: updateErr.message }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
