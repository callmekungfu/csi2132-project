import { CreateHotelBrandParams } from './types';

export const createHotelBrandQuery = (p: CreateHotelBrandParams) => {
  const a = p.address;
  return `with a as (
    insert into addresses (address, unit, locality, postal, country, admin_area)
    values ('${a.address}', '${a.unit ?? ''}', '${a.locality}', '${
    a.postal
  }', '${a.country}', '${a.admin_area}')
    returning address_id as id
), p as (
    insert into phone_numbers (phone_number)
    values ('${p.phone_number}')
    returning phone_number_id as id
), e as (
    insert into emails (email)
    values ('${p.email}')
    returning email_id as id
), b as (
    insert into hotel_brands (brand_name, address_id)
    values ('${p.name}', (select id from a))
    returning hotel_brand_id as id
), be as (
    insert into office_emails (hotel_brand_id, email_id)
    values ((select id from b), (select id from e))
), bp as (
    insert into office_phones (hotel_brand_id, phone_number_id)
    values ((select id from b), (select id from p))
) select id from b;`;
};

export const selectAllHotelBrandsQuery = () => {
  return `select
  hb.hotel_brand_id,
  brand_name,
  json_build_object('address', address, 'unit', unit, 'locality', locality, 'postal', postal, 'country', country, 'admin_area', admin_area) as office_address,
  array_agg(distinct e.email::text) as office_emails,
  array_agg(distinct pn.phone_number) as office_phones
from hotel_brands hb
inner join addresses a
   on a.address_id = hb.address_id
left join office_emails oe on hb.hotel_brand_id = oe.hotel_brand_id
inner join emails e on oe.email_id = e.email_id
left join office_phones op on hb.hotel_brand_id = op.hotel_brand_id
inner join phone_numbers pn on op.phone_number_id = pn.phone_number_id
group by hb.hotel_brand_id, brand_name, address, unit, locality, postal, country, admin_area`;
};

export const selectHotelBrandByIdQuery = (id: number) => {
  return `select
  hb.hotel_brand_id,
  brand_name,
  json_build_object('address', address, 'unit', unit, 'locality', locality, 'postal', postal, 'country', country, 'admin_area', admin_area) as office_address,
  array_agg(distinct e.email::text) as office_emails,
  array_agg(distinct pn.phone_number) as office_phones
from hotel_brands hb
inner join addresses a
   on a.address_id = hb.address_id
left join office_emails oe on hb.hotel_brand_id = oe.hotel_brand_id
inner join emails e on oe.email_id = e.email_id
left join office_phones op on hb.hotel_brand_id = op.hotel_brand_id
inner join phone_numbers pn on op.phone_number_id = pn.phone_number_id
where hb.hotel_brand_id = ${id}
group by hb.hotel_brand_id, brand_name, address, unit, locality, postal, country, admin_area`;
};
