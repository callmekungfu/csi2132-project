export const selectAllHotelsOfBrandQuery = (brandId: number) => {
  return `select
  h.hotel_id,
  hotel_name,
  room_count,
  json_build_object('address', address, 'unit', unit, 'locality', locality, 'postal', postal, 'country', country, 'admin_area', admin_area) as office_address,
  array_agg(distinct e.email::text) as office_emails,
  array_agg(distinct pn.phone_number) as office_phones
from hotels h
inner join addresses a
   on a.address_id = h.address_id
inner join hotel_emails oe on h.hotel_brand_id = oe.hotel_id
inner join emails e on oe.email_id = e.email_id
inner join hotel_phones op on h.hotel_brand_id = op.hotel_id
inner join phone_numbers pn on op.phone_number_id = pn.phone_number_id
where hotel_brand_id = ${brandId}
group by h.hotel_id, hotel_name, room_count, address, unit, locality, postal, country, admin_area;`;
};

export const selectHotelByIdQuery = (hotelId: number, brandId?: number) => {
  let filter = `where h.hotel_id = ${hotelId}`;
  if (hotelId && brandId) {
    filter = `where h.hotel_id = ${hotelId} and h.hotel_brand_id = ${brandId}`;
  }
  return `select
  h.hotel_id,
  hotel_name,
  room_count, 
  json_build_object('address', address, 'unit', unit, 'locality', locality, 'postal', postal, 'country', country, 'admin_area', admin_area) as office_address,
  array_agg(distinct e.email::text) as office_emails,
  array_agg(distinct pn.phone_number) as office_phones
from hotels h
inner join addresses a
   on a.address_id = h.address_id
inner join hotel_emails oe on h.hotel_brand_id = oe.hotel_id
inner join emails e on oe.email_id = e.email_id
inner join hotel_phones op on h.hotel_brand_id = op.hotel_id
inner join phone_numbers pn on op.phone_number_id = pn.phone_number_id
${filter}
group by h.hotel_id, hotel_name, room_count, address, unit, locality, postal, country, admin_area;`;
};
