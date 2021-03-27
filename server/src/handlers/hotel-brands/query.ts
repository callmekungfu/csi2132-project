import { CreateHotelBrandParams } from './types';

export const createHotelBrandQuery = (p: CreateHotelBrandParams) => {
  const a = p.address;
  return `with a as (
    insert into addresses (address, unit, locality, postal, country, admin_area)
    values ('${a.address}', ${a.unit}, '${a.locality}', '${a.postal}', '${a.country}', '${a.admin_area}')
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
