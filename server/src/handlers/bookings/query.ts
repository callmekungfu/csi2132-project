export const selectAllBookingsByHotelIdQuery = (hotelId: number) => {
  return `select b.booking_id,
  occupant_count,
  start_date,
  end_date,
  checked_in,
  checked_in_staff,
  r.room_id,
  c.customer_id,
  c2.full_name as customer_name
from bookings b
inner join rooms r on r.room_id = b.room_id
inner join hotels h on h.hotel_id = r.hotel_id
inner join customers c on b.customer_id = c.customer_id
inner join contacts c2 on c.contact_id = c2.contact_id
where h.hotel_id = ${hotelId}`;
};

export const selectBookingByBookingIdQuery = (id: number) => {
  return `select b.booking_id,
  occupant_count,
  start_date,
  end_date,
  checked_in,
  checked_in_staff,
  r.room_id,
  c.customer_id,
  c2.full_name as customer_name
from bookings b
inner join rooms r on r.room_id = b.room_id
inner join hotels h on h.hotel_id = r.hotel_id
inner join customers c on b.customer_id = c.customer_id
inner join contacts c2 on c.contact_id = c2.contact_id
where b.booking_id = ${id}`;
};
