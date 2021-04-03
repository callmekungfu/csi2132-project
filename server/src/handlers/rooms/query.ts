export const selectAllRoomsInHotelQuery = (
  hotelId: number,
  brandId?: number,
) => {
  let filter = `where h.hotel_id = ${hotelId}`;
  if (hotelId && brandId) {
    filter = `where h.hotel_id = ${hotelId} and h.hotel_brand_id = ${brandId}`;
  }
  return `select room_id,
  room_title,
  room_description,
  price,
  mountain_view,
  ocean_view,
  can_extend,
  has_tv,
  has_ac,
  has_mini_bar,
  has_hairdryer,
  has_wifi
from rooms r inner join hotels h on r.hotel_id = h.hotel_id
${filter};`;
};

export const selectAllRoomsInHotelFilterByDateRangeQuery = (
  hotelId: number,
  start_date: string,
  end_date: string,
  brandId?: number,
) => {
  let filter = `h.hotel_id = ${hotelId}`;
  if (hotelId && brandId) {
    filter = `h.hotel_id = ${hotelId} and h.hotel_brand_id = ${brandId}`;
  }

  return `select r.room_id,
  room_title,
  room_description,
  price,
  mountain_view,
  ocean_view,
  can_extend,
  has_tv,
  has_ac,
  has_mini_bar,
  has_hairdryer,
  has_wifi
from rooms r
    inner join hotels h on r.hotel_id = h.hotel_id
where ${filter} and (select count(*) from bookings b where b.room_id = r.room_id and (date '${start_date}', date '${end_date}') OVERLAPS (b.start_date, b.end_date)) = 0;`;
};

export const selectRoomByRoomIdAndHotelIdQuery = (
  roomId: number,
  hotelId: number,
  brandId?: number,
) => {
  let filter = `where room_id = ${roomId} and h.hotel_id = ${hotelId}`;
  if (hotelId && brandId) {
    filter = `where room_id = ${roomId} and h.hotel_id = ${hotelId} and h.hotel_brand_id = ${brandId}`;
  }
  return `select room_id,
  room_title,
  room_description,
  price,
  mountain_view,
  ocean_view,
  can_extend,
  has_tv,
  has_ac,
  has_mini_bar,
  has_hairdryer,
  has_wifi
from rooms r inner join hotels h on r.hotel_id = h.hotel_id
${filter};`;
};
