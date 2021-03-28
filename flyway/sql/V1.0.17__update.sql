alter table bookings add column if not exists customer_id int not null references customers(customer_id);

insert into bookings (occupant_count, start_date, end_date, checked_in, room_id, customer_id)
values (2, current_date + 7, current_date + 9, false, 5, 1), (4, current_date + 10, current_date + 12, false, 6, 2);