-- Enable citext extension
-- Case insensitive text more info: https://www.postgresql.org/docs/9.1/citext.html
CREATE EXTENSION citext;
-- Create a new domain called email that conforms to the HTML5 standard
CREATE DOMAIN email AS citext
  CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

create table emails (
    email_id serial primary key,
    email email not null
);

create table phone_numbers (
    phone_number_id serial primary key,
    phone_number text not null
);

create table addresses (
    address_id serial primary key,
    address text not null,
    unit text,
    locality text,
    postal text,
    country text,
    admin_area text
);

create table roles (
    role_id serial primary key,
    title text not null
);

create table contacts (
    contact_id serial primary key ,
    full_name text not null ,
    sin text not null,
    address_id int not null references addresses(address_id)
);

create table employees (
    employee_id serial primary key ,
    contact_id int not null references contacts(contact_id) on delete restrict ,
    rate decimal not null default 0
);

create table customers (
    custom_id serial primary key ,
    contact_id int not null references contacts(contact_id) on delete restrict ,
    registration_date date not null
);

create table hotel_brands (
    hotel_brand_id serial primary key,
    brand_name text not null,
    address_id int not null references addresses(address_id) on delete restrict
);

create table office_emails (
    office_email_id serial primary key,
    hotel_brand_id int not null references hotel_brands(hotel_brand_id) on delete cascade,
    email_id int not null references emails(email_id) on delete cascade
);

create table office_phones (
    office_phone_id serial primary key,
    hotel_brand_id int not null references hotel_brands(hotel_brand_id) on delete cascade,
    phone_number_id int not null references phone_numbers(phone_number_id) on delete cascade
);

-- Hotels table
-- Room count should be automatically calculated via a trigger
-- Hotel brand cannot be deleted if there are hotels on the brand
create table hotels (
    hotel_id serial primary key,
    hotel_name text not null,
    star_category int not null check ( star_category > 0 and star_category < 6 ),
    room_count int default 0,
    hotel_brand_id int not null references hotel_brands(hotel_brand_id) on delete restrict
);

create table rooms (
    room_id serial primary key ,
    room_title text not null ,
    room_description text ,
    hotel_id int not null references hotels(hotel_id) on delete restrict ,
    price decimal not null default 0 check ( price > 0 ),
    mountain_view bool default false,
    ocean_view bool default false,
    can_extend bool default false,
    has_tv bool default false,
    has_ac bool default false,
    has_mini_bar bool default false,
    has_hairdryer bool default false,
    has_wifi bool default false
);

create table bookings (
    booking_id serial primary key ,
    occupant_count int not null default 1,
    start_date timestamp not null ,
    end_date timestamp not null,
    checked_in bool not null default false,
    checked_in_staff int references employees(employee_id)
);

create table hotel_emails (
    hotel_email_id serial primary key,
    hotel_id int not null references hotels(hotel_id) on delete cascade,
    email_id int not null references emails(email_id) on delete cascade
);

create table hotel_phones (
    hotel_phone_id serial primary key,
    hotel_id int not null references hotels(hotel_id) on delete cascade,
    phone_number_id int not null references phone_numbers(phone_number_id) on delete cascade
);

create table hotel_employees (
    hotel_employee_id serial primary key ,
    hotel_id int not null references hotels(hotel_id) on delete cascade,
    employee_id int not null references employees(employee_id) on delete cascade
);

-- Create trigger to automatically update hotel room count when room table is modified
create or replace function update_hotel_room_count()
    returns trigger as
$$
    begin
        -- update hotel room count if the hotel id equals the new one or the
        update hotels h
            set room_count = (select count(*) from rooms r where r.hotel_id = h.hotel_id)
        where h.hotel_id = new.hotel_id or h.hotel_id = old.hotel_id;
        return new;
    end;
$$ language plpgsql;

create trigger update_hotel_room_count
    after update or insert or delete on rooms
for each row
    execute procedure update_hotel_room_count();