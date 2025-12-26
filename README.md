# Project-1

## Supabase Setup

This site uses Supabase directly from the frontend. Ensure these tables exist in your Supabase project:

- profiles: `id uuid primary key`, `full_name text`, `email text`, `phone text`, `role text`, `farm_name text`, `avatar_url text`, `aadhar_number text`, `location text`, `created_at timestamptz default now()`
- products: `id uuid default gen_random_uuid() primary key`, `name text`, `description text`, `category text`, `price numeric`, `unit text`, `stock int`, `is_active boolean default true`, `farmer_id uuid`, `created_at timestamptz default now()`
- orders: `id uuid default gen_random_uuid() primary key`, `user_id uuid`, `farmer_id uuid`, `items jsonb`, `total_amount numeric`, `status text`, `created_at timestamptz default now()`
- tours: `id uuid default gen_random_uuid() primary key`, `name text`, `description text`, `is_active boolean default true`, `created_at timestamptz default now()`
- user_activities: `id bigint generated always as identity primary key`, `user_id uuid`, `activity_type text`, `details jsonb`, `created_at timestamptz default now()`
- delivery_checks: `id bigint generated always as identity primary key`, `location text`, `pincode text`, `is_available boolean`, `checked_at timestamptz default now()`

Note: Use Postgres extension `pgcrypto` or `uuid-ossp` for UUID generation depending on your setup, or handle IDs in the application.

## Configuration

- Update `config.js` with your Supabase `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- Optionally, set `CLARITY_PROJECT_ID` if analytics is desired.

## Pages wired to Supabase

- profile.html: Fetches and renders profile details from `profiles` table.
- farmerpage.html: Loads farmer profile and inserts new products into `products` on form submit.
- customer.html: Already integrates with Supabase for products, orders, activities.

## Backend Coordination

The frontend calls `API_BASE_URL` for product/tour listing fallbacks (`config.js`). If changes are needed in `unobtrix-project-backend/server.js`, ensure:
- CORS allows requests from this site.
- Routes `/api/products` and `/api/tours` return `{ success: true, data: [...] }`.
- Align schema with the Supabase tables above.