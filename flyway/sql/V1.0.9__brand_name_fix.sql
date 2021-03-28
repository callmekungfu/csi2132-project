update public.hotel_brands
set brand_name = 'Andaz - a concept by Hyatt'
where hotel_brand_id = 2;

alter table hotels add column address_id int references addresses(address_id);