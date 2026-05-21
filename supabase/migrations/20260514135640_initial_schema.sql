create extension if not exists pgcrypto;

-- Profiles (extends Supabase Auth)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- User's card collection
create table public.user_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  card_id text not null,
  card_name text not null,
  card_image_url text,
  set_name text,
  set_id text,
  rarity text,
  quantity integer not null default 1 check (quantity > 0),
  condition text not null check (condition in ('mint', 'near_mint', 'excellent', 'good', 'played')),
  purchase_price numeric(10,2) check (purchase_price >= 0),
  purchase_date date,
  notes text,
  is_for_trade boolean not null default false,
  last_known_market_price numeric(10,2) check (last_known_market_price >= 0),
  price_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, card_id, condition)
);

-- Wishlist
create table public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  card_id text not null,
  card_name text not null,
  card_image_url text,
  set_name text,
  max_price numeric(10,2) check (max_price >= 0),
  priority text check (priority in ('low', 'medium', 'high')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, card_id)
);

-- Price alerts
create table public.price_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  card_id text not null,
  target_price numeric(10,2) not null check (target_price > 0),
  alert_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_user_cards_user_id on public.user_cards(user_id);
create index idx_user_cards_card_id on public.user_cards(card_id);
create index idx_wishlist_user_id on public.wishlist(user_id);
create index idx_price_alerts_user_id on public.price_alerts(user_id);

-- updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_user_cards_updated_at
before update on public.user_cards
for each row execute function public.set_updated_at();

create trigger set_wishlist_updated_at
before update on public.wishlist
for each row execute function public.set_updated_at();

create trigger set_price_alerts_updated_at
before update on public.price_alerts
for each row execute function public.set_updated_at();