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

create or replace function check_if_last_office_email()
    returns trigger as
$$
    begin
        if (select count(*)
        from office_emails oe
        where oe.hotel_brand_id = old.hotel_brand_id) = 1 then
            raise exception 'This is the last email for the brand, it cannot be removed';
        end if;
        return old;
    end;
$$ language plpgsql;

drop trigger if exists check_if_last_office_email ON office_emails;

create trigger check_if_last_office_email
    before delete on office_emails
for each row
    execute procedure check_if_last_office_email();

create or replace function check_if_last_office_phone()
    returns trigger as
$$
    begin
        if (select count(*)
        from office_phones oe
        where oe.hotel_brand_id = old.hotel_brand_id) = 1 then
            raise exception 'This is the last phone for the brand, it cannot be removed';
        end if;
        return old;
    end;
$$ language plpgsql;

drop trigger if exists check_if_last_office_phone ON office_phones;

create trigger check_if_last_office_phone
    before delete on office_phones
for each row
    execute procedure check_if_last_office_phone();

create or replace function check_if_last_hotel_phone()
    returns trigger as
$$
    begin
        if (select count(*)
        from hotel_phones oe
        where oe.hotel_id = old.hotel_id) = 1 then
            raise exception 'This is the last phone for the hotel, it cannot be removed';
        end if;
        return old;
    end;
$$ language plpgsql;

drop trigger if exists check_if_last_hotel_phone ON hotel_phones;

create trigger check_if_last_hotel_phone
    before delete on hotel_phones
for each row
    execute procedure check_if_last_hotel_phone();