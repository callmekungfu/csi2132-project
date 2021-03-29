create or replace function check_booking_date_before_insert()
    returns trigger as
$$
    begin
        if (select count(*)
        from bookings b
        where (new.start_date::date, new.end_date::date) overlaps (b.start_date, b.end_date) and new.room_id = b.room_id) > 0 then
            raise exception 'A booking for room with id % already exists between % and %', new.room_id, new.start_date, new.end_date;
        end if;
        return new;
    end;
$$ language plpgsql;

drop trigger if exists check_booking_times ON bookings;

create trigger check_booking_times
    before update or insert on bookings
for each row
    execute procedure check_booking_date_before_insert();

