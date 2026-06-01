// types.ts
import type { User } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert, TablesUpdate } from "./database.types";

// Core table row types
export type Profile = Tables<"profiles">;
export type UserCard = Tables<"user_cards">;
export type WishlistItem = Tables<"wishlist">;
export type PriceAlert = Tables<"price_alerts">;

// Insert types
export type ProfileInsert = TablesInsert<"profiles">;
export type UserCardInsert = TablesInsert<"user_cards">;
export type WishlistItemInsert = TablesInsert<"wishlist">;
export type PriceAlertInsert = TablesInsert<"price_alerts">;

// Update types
export type ProfileUpdate = TablesUpdate<"profiles">;
export type UserCardUpdate = TablesUpdate<"user_cards">;
export type WishlistItemUpdate = TablesUpdate<"wishlist">;
export type PriceAlertUpdate = TablesUpdate<"price_alerts">;

// Auth User from supabase
export type AuthUser = User;

// Optional exports if you want them available elsewhere
export type { Database };
