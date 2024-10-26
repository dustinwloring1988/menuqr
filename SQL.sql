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
    stripe_subscription_id text unique,
    max_menus integer default 1,
    max_qr_codes integer default 5,
    max_views integer default 1000,
    max_storage_gb integer default 1
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
    updated_at timestamp with time zone default now(),
    seo_title text,
    seo_description text,
    custom_css text,
    custom_js text,
    custom_html text
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
    updated_at timestamp with time zone default now(),
    preparation_time interval,
    spiciness_level integer check (spiciness_level between 0 and 5),
    dietary_flags text[] default array[]::text[],
    custom_fields jsonb default '{}'::jsonb
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
begin
    -- Update organization limits based on new tier
    case new.subscription_tier
        when 'starter' then
            new.max_menus := 1;
            new.max_qr_codes := 5;
            new.max_views := 1000;
            new.max_storage_gb := 1;
        when 'professional' then
            new.max_menus := 5;
            new.max_qr_codes := 25;
            new.max_views := 5000;
            new.max_storage_gb := 5;
        when 'enterprise' then
            new.max_menus := null; -- unlimited
            new.max_qr_codes := null; -- unlimited
            new.max_views := null; -- unlimited
            new.max_storage_gb := 25;
    end case;

    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for subscription tier changes
drop trigger if exists on_subscription_tier_change on organizations;
create trigger on_subscription_tier_change
    before update of subscription_tier on organizations
    for each row
    when (old.subscription_tier is distinct from new.subscription_tier)
    execute procedure handle_subscription_tier_change();

-- Create new table for menu translations
create table menu_translations (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    language_code text not null,
    name text not null,
    description text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(menu_id, language_code)
);

-- Create new table for item translations
create table item_translations (
    id uuid primary key default uuid_generate_v4(),
    item_id uuid references items(id) on delete cascade,
    language_code text not null,
    name text not null,
    description text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(item_id, language_code)
);

-- Create new table for menu access logs
create table menu_access_logs (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    ip_address text,
    user_agent text,
    referer text,
    language_code text,
    device_type text,
    created_at timestamp with time zone default now()
);

-- Create new table for menu feedback
create table menu_feedback (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    rating integer check (rating between 1 and 5),
    comment text,
    created_at timestamp with time zone default now()
);

-- Create new table for menu revisions
create table menu_revisions (
    id uuid primary key default uuid_generate_v4(),
    menu_id uuid references menus(id) on delete cascade,
    data jsonb not null,
    created_by uuid references auth.users(id) on delete set null,
    created_at timestamp with time zone default now()
);

-- Add RLS policies for new tables
alter table menu_translations enable row level security;
alter table item_translations enable row level security;
alter table menu_access_logs enable row level security;
alter table menu_feedback enable row level security;
alter table menu_revisions enable row level security;

-- Create policies for menu translations
create policy "Users can view translations for their organizations' menus"
    on menu_translations for select
    using (
        menu_id in (
            select m.id 
            from menus m
            join organizations o on m.organization_id = o.id
            join organization_members om on o.id = om.organization_id
            where om.user_id = auth.uid()
        )
    );

create policy "Users can create translations for their organizations' menus"
    on menu_translations for insert
    with check (
        menu_id in (
            select m.id 
            from menus m
            join organizations o on m.organization_id = o.id
            join organization_members om on o.id = om.organization_id
            where om.user_id = auth.uid()
        )
    );

-- Create function to check translation limits
create or replace function check_translation_limit(org_id uuid, menu_id uuid)
returns boolean as $$
declare
    translation_count integer;
    tier subscription_tier;
begin
    -- Get organization's subscription tier
    select subscription_tier into tier
    from organizations
    where id = org_id;

    -- Get current translation count for the menu
    select count(*) into translation_count
    from menu_translations mt
    join menus m on mt.menu_id = m.id
    where m.id = menu_id;

    -- Check limits based on tier
    case tier
        when 'starter' then
            return translation_count < 1;
        when 'professional' then
            return translation_count < 5;
        when 'enterprise' then
            return true;
        else
            return translation_count < 1;
    end case;
end;
$$ language plpgsql security definer;

-- Create function to track menu views
create or replace function track_menu_view(
    p_menu_id uuid,
    p_ip_address text,
    p_user_agent text,
    p_referer text,
    p_language_code text,
    p_device_type text
)
returns void as $$
begin
    insert into menu_access_logs (
        menu_id,
        ip_address,
        user_agent,
        referer,
        language_code,
        device_type
    ) values (
        p_menu_id,
        p_ip_address,
        p_user_agent,
        p_referer,
        p_language_code,
        p_device_type
    );

    -- Update menu views count
    insert into menu_views (menu_id, device_type)
    values (p_menu_id, p_device_type);
end;
$$ language plpgsql security definer;

-- Create indexes for better performance
create index idx_menu_translations_menu_id on menu_translations(menu_id);
create index idx_item_translations_item_id on item_translations(item_id);
create index idx_menu_access_logs_menu_id on menu_access_logs(menu_id);
create index idx_menu_access_logs_created_at on menu_access_logs(created_at);
create index idx_menu_feedback_menu_id on menu_feedback(menu_id);
create index idx_menu_revisions_menu_id on menu_revisions(menu_id);
