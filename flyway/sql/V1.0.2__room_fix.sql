

alter table bookings add column room_id int references rooms(room_id) on delete restrict;