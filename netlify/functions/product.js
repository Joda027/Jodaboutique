// Sert un aperçu (WhatsApp/Facebook) correct pour un produit, puis redirige
// les vraies visiteuses vers la boutique sur cet article.
// Appelé via la redirection /produit/:id définie dans netlify.toml.

const SUPABASE_URL = 'https://sfkxhelutkoqinmfceyc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HQc7xFR0jmCbFXXqhOFDhw_fjZ-x07V';
const SITE_URL = 'https://jodaboutique.netlify.app';

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

exports.handler = async (event) => {
  const parts = event.path.split('/').filter(Boolean);
  const id = decodeURIComponent(parts[parts.length - 1] || '');

  let product = null;
  if(id){
    try{
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(id)}&approved=eq.true&select=id,name,price,image`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const rows = await res.json();
      product = Array.isArray(rows) ? rows[0] : null;
    }catch(e){ /* pas de fiche produit : on retombe sur l'aperçu générique */ }
  }

  const title = product ? `${product.name} — Joda Boutique` : 'Joda Boutique — Bijoux & accessoires à Conakry';
  const description = product
    ? `${product.name} à ${Number(product.price).toLocaleString('fr-FR')} GNF. Bijoux et accessoires à Conakry, Guinée.`
    : "Bijoux et accessoires de qualité à Conakry, Guinée. Colliers, bracelets, boucles d'oreilles, bagues et sacs à commander en ligne.";
  const image = (product && product.image && /^https?:\/\//.test(product.image)) ? product.image : `${SITE_URL}/apercu.jpg`;
  const redirectUrl = product ? `${SITE_URL}/?p=${encodeURIComponent(product.id)}` : SITE_URL;

  const html = `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta property="og:type" content="product">
<meta property="og:site_name" content="Joda Boutique">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:url" content="${escapeHtml(redirectUrl)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(image)}">
<meta http-equiv="refresh" content="0; url=${escapeHtml(redirectUrl)}">
</head><body>
<p>Redirection vers <a href="${escapeHtml(redirectUrl)}">Joda Boutique</a>…</p>
<script>location.replace(${JSON.stringify(redirectUrl)});</script>
</body></html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
    body: html
  };
};
