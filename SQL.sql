-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types
create type subscription_tier as enum ('free', 'starter', 'professional', 'enterprise');
create type menu_layout as enum ('grid', 'list', 'compact');

-- Create organizations table
create table organizations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    subdomain text unique not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    business_phone text,
    address text,
    city text,
    state text,
    zipcode text,
    subscription_tier subscription_tier default 'free',
    subscription_status text default 'active',
    stripe_customer_id text unique,
    stripe_subscription_id text unique
);

-- Create organization_members table to link users to organizations
create table organization_members (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references organizations(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    role text not null default 'member',
    created_at timestamp with time zone default now(),
    unique(organization_id, user_id)
);

-- Create business_hours table
create table business_hours (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references organizations(id) on delete cascade,
    day_of_week integer not null check (day_of_week between 0 and 6),
    open_time time,
    close_time time,
    is_closed boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(organization_id, day_of_week)
);

-- Create menus table
create table menus (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references organizations(id) on delete cascade,
    name text not null,
    description text,
    image_url text,
    is_listed boolean default true,
    start_time time,
    end_time time,
    available_days integer[] default array[0,1,2,3,4,5,6],
    layout menu_layout default 'grid',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create categories table
create table categories (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    name text not null,
    description text,
    display_order integer default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create items table
create table items (
    id uuid primary key default uuid_generate_v4(),
    category_id uuid references categories(id) on delete cascade,
    name text not null,
    description text,
    price decimal(10,2) not null,
    image_url text,
    ingredients text[],
    allergens text[],
    calories integer,
    display_order integer default 0,
    is_available boolean default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create qr_codes table
create table qr_codes (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    created_at timestamp with time zone default now(),
    last_regenerated_at timestamp with time zone default now()
);

-- Create menu_views table for analytics
create table menu_views (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    item_id uuid references items(id) on delete set null,
    device_type text,
    view_duration integer, -- in seconds
    created_at timestamp with time zone default now()
);

-- Create branding_settings table
create table branding_settings (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references organizations(id) on delete cascade,
    primary_color text default '#adfa1d',
    logo_url text,
    favicon_url text,
    font_family text default 'Inter',
    custom_css text,
    business_page_settings jsonb default '{
        "heroImages": [],
        "backgroundColor": "#ffffff",
        "textColor": "#000000",
        "showSocialLinks": true
    }'::jsonb,
    menu_selection_settings jsonb default '{
        "layout": "grid",
        "showDescriptions": true,
        "showImages": true,
        "backgroundColor": "#ffffff"
    }'::jsonb,
    menu_page_settings jsonb default '{
        "layout": "grid",
        "showImages": true,
        "showDescriptions": true,
        "showAllergies": true,
        "showNutrition": true,
        "backgroundColor": "#ffffff"
    }'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(organization_id)
);

-- Create dashboard_widgets table
create table dashboard_widgets (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references organizations(id) on delete cascade,
    enabled_widgets text[] default array[
        'total-menus',
        'active-qr-codes',
        'total-views',
        'revenue',
        'avg-time',
        'menu-item-views',
        'return-visitors',
        'peak-hours',
        'language-preferences',
        'menu-categories',
        'dietary-filters',
        'search-usage',
        'views-chart',
        'device-usage',
        'menu-views-distribution'
    ],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(organization_id)
);

-- Create RLS policies
alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table business_hours enable row level security;
alter table menus enable row level security;
alter table categories enable row level security;
alter table items enable row level security;
alter table qr_codes enable row level security;
alter table menu_views enable row level security;
alter table branding_settings enable row level security;
alter table dashboard_widgets enable row level security;

-- Create policies for organizations
create policy "Users can view their organizations"
    on organizations for select
    using (
        id in (
            select organization_id 
            from organization_members 
            where user_id = auth.uid()
        )
    );

create policy "Users can create organizations"
    on organizations for insert
    with check (true);

create policy "Organization members can update their organization"
    on organizations for update
    using (
        id in (
            select organization_id 
            from organization_members 
            where user_id = auth.uid()
        )
    );

-- Add similar policies for other tables...

-- Create functions
create or replace function public.handle_new_user() 
returns trigger as $$
begin
    insert into public.organizations (name, subdomain)
    values (
        new.raw_user_meta_data->>'business_name',
        lower(regexp_replace(new.raw_user_meta_data->>'business_name', '[^a-zA-Z0-9]', '-', 'g'))
    )
    returning id into new.organization_id;

    insert into public.organization_members (organization_id, user_id, role)
    values (new.organization_id, new.id, 'owner');

    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user registration
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Create indexes for better performance
create index idx_organization_members_user_id on organization_members(user_id);
create index idx_organization_members_org_id on organization_members(organization_id);
create index idx_menus_organization_id on menus(organization_id);
create index idx_items_category_id on items(category_id);
create index idx_menu_views_menu_id on menu_views(menu_id);
create index idx_menu_views_created_at on menu_views(created_at);

-- Add these after the existing tables but before the RLS policies

-- Create a function to check menu count limits
create or replace function check_menu_limit(org_id uuid)
returns boolean as $$
declare
    menu_count integer;
    tier subscription_tier;
begin
    -- Get organization's subscription tier
    select subscription_tier into tier
    from organizations
    where id = org_id;

    -- Get current menu count
    select count(*) into menu_count
    from menus
    where organization_id = org_id;

    -- Check limits based on tier
    case tier
        when 'starter' then
            return menu_count < 1;
        when 'professional' then
            return menu_count < 5;
        when 'enterprise' then
            return true;
        else
            return menu_count < 1;
    end case;
end;
$$ language plpgsql security definer;

-- Create a function to get allowed widgets based on tier
create or replace function get_allowed_widgets(org_id uuid)
returns text[] as $$
declare
    tier subscription_tier;
begin
    -- Get organization's subscription tier
    select subscription_tier into tier
    from organizations
    where id = org_id;

    -- Return allowed widgets based on tier
    case tier
        when 'starter' then
            return array[
                'views-chart',
                'device-usage',
                'menu-views-distribution'
            ];
        when 'professional', 'enterprise' then
            return array[
                'total-menus',
                'active-qr-codes',
                'total-views',
                'revenue',
                'avg-time',
                'menu-item-views',
                'return-visitors',
                'peak-hours',
                'language-preferences',
                'menu-categories',
                'dietary-filters',
                'search-usage',
                'views-chart',
                'device-usage',
                'menu-views-distribution'
            ];
        else
            return array[
                'views-chart',
                'device-usage',
                'menu-views-distribution'
            ];
    end case;
end;
$$ language plpgsql security definer;

-- Modify the dashboard_widgets table default to use the function
alter table dashboard_widgets 
    alter column enabled_widgets 
    set default array[
        'views-chart',
        'device-usage',
        'menu-views-distribution'
    ];

-- Add policy for menu creation with tier limits
create policy "Check menu limits on insert"
    on menus
    for insert
    with check (
        check_menu_limit(organization_id)
    );

-- Add trigger to enforce widget restrictions
create or replace function enforce_widget_restrictions()
returns trigger as $$
declare
    allowed_widgets text[];
begin
    -- Get allowed widgets for the organization
    allowed_widgets := get_allowed_widgets(new.organization_id);
    
    -- Filter out any widgets that aren't allowed for the tier
    new.enabled_widgets := array(
        select unnest(new.enabled_widgets)
        intersect
        select unnest(allowed_widgets)
    );
    
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for widget restrictions
create trigger enforce_widget_restrictions_trigger
    before insert or update on dashboard_widgets
    for each row execute procedure enforce_widget_restrictions();

-- Add function to handle subscription tier changes
create or replace function handle_subscription_tier_change()
returns trigger as $$
declare
    menu_count integer;
    allowed_widgets text[];
begin
    -- If downgrading to starter or professional, check menu count
    if (new.subscription_tier = 'starter') then
        select count(*) into menu_count
        from menus
        where organization_id = new.id;
        
        if menu_count > 1 then
            raise exception 'Cannot downgrade to Starter tier with more than 1 menu';
        end if;
    elsif (new.subscription_tier = 'professional') then
        select count(*) into menu_count
        from menus
        where organization_id = new.id;
        
        if menu_count > 5 then
            raise exception 'Cannot downgrade to Professional tier with more than 5 menus';
        end if;
    end if;

    -- Update allowed widgets based on new tier
    allowed_widgets := get_allowed_widgets(new.id);
    
    -- Update dashboard_widgets table
    update dashboard_widgets
    set enabled_widgets = array(
        select unnest(enabled_widgets)
        intersect
        select unnest(allowed_widgets)
    )
    where organization_id = new.id;

    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for subscription tier changes
create trigger on_subscription_tier_change
    after update of subscription_tier on organizations
    for each row
    when (old.subscription_tier is distinct from new.subscription_tier)
    execute procedure handle_subscription_tier_change();
