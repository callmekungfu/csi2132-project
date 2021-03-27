

alter table bookings add column booking_id int references rooms(room_id) on delete restrict;