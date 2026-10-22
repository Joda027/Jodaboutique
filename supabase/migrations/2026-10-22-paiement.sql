-- ============================================================
-- Joda Boutique — modes de paiement (Orange Money, paiement en ligne, à la livraison)
-- Pour une base DÉJÀ installée : Supabase > SQL Editor > New query,
-- collez tout ce fichier puis cliquez Run. Sans risque si exécuté plusieurs fois.
-- (schema.sql contient déjà ces changements pour une nouvelle installation.)
-- ============================================================

-- Mode de paiement choisi par la cliente (bases existantes : colonnes ajoutées ici).
--   orange_money : transfert manuel au numéro de la boutique, vérifié par l'équipe
--   en_ligne     : paiement Orange Money Web Payment, confirmé automatiquement
--   livraison    : espèces à la réception
alter table orders add column if not exists payment_method text not null default 'livraison';
alter table orders add column if not exists payment_phone text;
alter table orders add column if not exists payment_ref text;
alter table orders add column if not exists payment_status text not null default 'en attente';
alter table orders add column if not exists pay_token text;    -- jeton Orange (paiement en ligne)
alter table orders add column if not exists notif_token text;  -- jeton de notification Orange
alter table orders drop constraint if exists orders_payment_method_check;
alter table orders add constraint orders_payment_method_check
  check (payment_method in ('orange_money','en_ligne','livraison'));
alter table orders drop constraint if exists orders_payment_status_check;
alter table orders add constraint orders_payment_status_check
  check (payment_status in ('en attente','reçu','échoué'));

-- Paiement en ligne Orange Money : activé depuis Réglages une fois les clés Orange configurées sur Netlify.
alter table settings add column if not exists online_payment boolean default false;

drop function if exists place_order(text, text, jsonb);
drop function if exists place_order(text, text, jsonb, text);
drop function if exists place_order(text, text, jsonb, text, text);
create or replace function place_order(
  p_customer text,
  p_phone text,
  p_items jsonb,  -- [{"id": "...", "qty": 2, "variantId": "..." (optionnel)}, ...]
  p_address text default null,
  p_delivery_zone text default null,
  p_payment_method text default 'livraison',  -- 'orange_money', 'en_ligne' ou 'livraison'
  p_payment_phone text default null,          -- numéro Orange Money qui a payé
  p_payment_ref text default null             -- référence de transaction (SMS)
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_product products%rowtype;
  v_variant product_variants%rowtype;
  v_color text;
  v_variant_id text;
  v_total numeric := 0;
  v_order_items jsonb := '[]'::jsonb;
  v_order_id text := 'o' || (floor(extract(epoch from now())*1000))::bigint::text || floor(random()*1000)::text;
  v_ts bigint := (floor(extract(epoch from now())*1000))::bigint;
  v_qty integer;
  v_unit_price numeric;
  v_promo_active boolean := false;
  v_promo_percent numeric := 0;
  v_promo_ends_at timestamptz;
  v_delivery_enabled boolean := false;
  v_delivery_zones jsonb := '[]'::jsonb;
  v_delivery_fee numeric := 0;
  v_zone jsonb;
begin
  if p_customer is null or length(trim(p_customer)) = 0 then
    raise exception 'Nom du client requis';
  end if;
  if p_phone is null or length(trim(p_phone)) = 0 then
    raise exception 'Numéro de téléphone requis';
  end if;
  if trim(p_phone) !~ '^[0-9]+$' then
    raise exception 'Numéro de téléphone invalide (chiffres uniquement)';
  end if;
  if p_address is null or length(trim(p_address)) = 0 then
    raise exception 'Adresse de livraison requise';
  end if;
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Le panier est vide';
  end if;
  p_payment_method := coalesce(nullif(trim(p_payment_method), ''), 'livraison');
  if p_payment_method not in ('orange_money','en_ligne','livraison') then
    raise exception 'Mode de paiement invalide';
  end if;
  if p_payment_method = 'orange_money' then
    if p_payment_phone is null or trim(p_payment_phone) !~ '^[0-9]+$' then
      raise exception 'Numéro Orange Money invalide (chiffres uniquement)';
    end if;
  elsif p_payment_method = 'en_ligne' then
    p_payment_ref := null;  -- la référence vient d'Orange, pas de la cliente
  else
    p_payment_phone := null;
    p_payment_ref := null;
  end if;

  select coalesce(promo_active,false), coalesce(promo_percent,0), promo_ends_at,
         coalesce(delivery_enabled,false), coalesce(delivery_zones,'[]'::jsonb)
    into v_promo_active, v_promo_percent, v_promo_ends_at,
         v_delivery_enabled, v_delivery_zones
    from settings where id = true;

  if v_promo_ends_at is not null and v_promo_ends_at <= now() then
    v_promo_active := false;
  end if;

  if v_delivery_enabled and p_delivery_zone is not null and length(trim(p_delivery_zone)) > 0 then
    for v_zone in select * from jsonb_array_elements(v_delivery_zones) loop
      if v_zone->>'zone' = p_delivery_zone then
        v_delivery_fee := coalesce((v_zone->>'price')::numeric, 0);
        exit;
      end if;
    end loop;
  else
    p_delivery_zone := null;
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item->>'qty')::integer;
    if v_qty is null or v_qty <= 0 then
      raise exception 'Quantité invalide';
    end if;
    v_variant_id := v_item->>'variantId';
    v_color := null;

    if v_variant_id is not null then
      update product_variants
        set stock = stock - v_qty
        where id = v_variant_id and product_id = (v_item->>'id') and stock >= v_qty
        returning * into v_variant;

      if not found then
        raise exception 'Stock insuffisant pour une des couleurs choisies';
      end if;

      select * into v_product from products where id = v_item->>'id' and approved = true;
      if not found then
        raise exception 'Article introuvable ou non approuvé';
      end if;

      update products set stock = stock - v_qty where id = v_product.id;
      v_color := v_variant.color;
    else
      update products
        set stock = stock - v_qty
        where id = (v_item->>'id') and approved = true and stock >= v_qty
        returning * into v_product;

      if not found then
        raise exception 'Stock insuffisant pour un des articles';
      end if;
    end if;

    v_unit_price := v_product.price;
    if v_promo_active and v_promo_percent > 0 then
      v_unit_price := round(v_product.price * (1 - v_promo_percent/100.0));
    end if;

    v_total := v_total + (v_unit_price * v_qty);
    v_order_items := v_order_items || jsonb_build_object(
      'id', v_product.id, 'name', v_product.name, 'price', v_unit_price, 'qty', v_qty,
      'color', v_color, 'variantId', v_variant_id
    );
  end loop;

  -- v_total reste le montant des articles uniquement : les frais de livraison
  -- sont conservés à part (delivery_fee) et n'entrent pas dans les statistiques.

  insert into orders (id, ts, customer, phone, address, delivery_zone, delivery_fee, items, total, status,
                      payment_method, payment_phone, payment_ref)
  values (v_order_id, v_ts, trim(p_customer), trim(p_phone), trim(p_address), p_delivery_zone, v_delivery_fee, v_order_items, v_total, 'nouvelle',
          p_payment_method, trim(p_payment_phone), nullif(trim(p_payment_ref), ''));

  insert into activity_log (actor, action)
  values ('Cliente : ' || trim(p_customer), 'a passé une commande de ' || v_total || ' GNF');

  return jsonb_build_object('id', v_order_id, 'ts', v_ts, 'total', v_total, 'items', v_order_items, 'deliveryZone', p_delivery_zone, 'deliveryFee', v_delivery_fee, 'paymentMethod', p_payment_method);
end;
$$;
grant execute on function place_order(text, text, jsonb, text, text, text, text, text) to anon, authenticated;
