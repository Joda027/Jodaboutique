// Image affichée quand le lien de la boutique est partagé (WhatsApp, Facebook…).
// Servie à l'adresse /apercu.jpg (voir netlify.toml) :
//   1. la photo choisie dans Réglages (settings.share_image),
//   2. sinon la photo d'une pièce publiée,
//   3. sinon le logo.
const SUPABASE_URL = 'https://sfkxhelutkoqinmfceyc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HQc7xFR0jmCbFXXqhOFDhw_fjZ-x07V';
const SITE_URL = 'https://jodaboutique.com';

async function rest(path){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
  if(!res.ok) return null;
  return res.json();
}

async function pickImageUrl(){
  const settings = await rest('settings?id=eq.true&select=share_image').catch(()=>null);
  const chosen = Array.isArray(settings) && settings[0] && settings[0].share_image;
  if(chosen && /^https?:\/\//.test(chosen)) return chosen;
  const products = await rest('products?approved=eq.true&stock=gt.0&image=like.http*&select=image&order=created_at.desc&limit=1').catch(()=>null);
  if(Array.isArray(products) && products[0]) return products[0].image;
  return null;
}

exports.handler = async () => {
  try{
    const url = await pickImageUrl();
    if(url){
      const img = await fetch(url);
      if(img.ok){
        const buf = Buffer.from(await img.arrayBuffer());
        return {
          statusCode: 200,
          headers: { 'Content-Type': img.headers.get('content-type') || 'image/jpeg', 'Cache-Control': 'public, max-age=3600' },
          body: buf.toString('base64'),
          isBase64Encoded: true
        };
      }
    }
  }catch(e){ console.error('og-image', e); }
  return { statusCode: 302, headers: { Location: `${SITE_URL}/logo.webp`, 'Cache-Control': 'public, max-age=300' }, body: '' };
};
