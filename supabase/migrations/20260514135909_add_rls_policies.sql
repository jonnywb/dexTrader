alter table public.profiles enable row level security;
alter table public.user_cards enable row level security;
alter table public.wishlist enable row level security;
alter table public.price_alerts enable row level security;

-- Profiles
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- User cards
create policy "user_cards_select_own"
on public.user_cards
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "user_cards_insert_own"
on public.user_cards
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "user_cards_update_own"
on public.user_cards
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "user_cards_delete_own"
on public.user_cards
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Wishlist
create policy "wishlist_select_own"
on public.wishlist
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "wishlist_insert_own"
on public.wishlist
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "wishlist_update_own"
on public.wishlist
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "wishlist_delete_own"
on public.wishlist
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Price alerts
create policy "price_alerts_select_own"
on public.price_alerts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "price_alerts_insert_own"
on public.price_alerts
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "price_alerts_update_own"
on public.price_alerts
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "price_alerts_delete_own"
on public.price_alerts
for delete
to authenticated
using ((select auth.uid()) = user_id);