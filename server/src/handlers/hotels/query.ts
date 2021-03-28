import { CreateHotelParams } from './types';

export const selectAllHotelBrandsQuery = () => {
  return `select
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
group by brand_name, address, unit, locality, postal, country, admin_area`;
};

export const selectHotelBrandByIdQuery = (id: number) => {
  return `select
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
group by brand_name, address, unit, locality, postal, country, admin_area`;
};
