-- SGG Private Kitchen Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories Table
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  is_front boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Dishes Table
create table if not exists dishes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  price numeric(10,2) default 0,
  description text default '',
  image_url text default '',
  spicy_level integer default 0 check (spicy_level >= 0 and spicy_level <= 3),
  popular boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index if not exists dishes_category_idx on dishes(category);
create index if not exists dishes_popular_idx on dishes(popular);
create index if not exists categories_display_order_idx on categories(display_order);

-- Enable Row Level Security (RLS)
alter table categories enable row level security;
alter table dishes enable row level security;

-- Public read access for categories
create policy "Enable read access for all users" on categories
  for select using (true);

-- Public read access for dishes
create policy "Enable read access for all users" on dishes
  for select using (true);

-- Authenticated users can insert/update/delete categories
create policy "Enable insert for authenticated users only" on categories
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on categories
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on categories
  for delete using (auth.role() = 'authenticated');

-- Authenticated users can insert/update/delete dishes
create policy "Enable insert for authenticated users only" on dishes
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on dishes
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on dishes
  for delete using (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_categories_updated_at before update on categories
  for each row execute function update_updated_at_column();

create trigger update_dishes_updated_at before update on dishes
  for each row execute function update_updated_at_column();
