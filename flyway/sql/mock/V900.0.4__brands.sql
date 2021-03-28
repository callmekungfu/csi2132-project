with a as (
    insert into addresses (address, unit, locality, postal, country, admin_area)
    values ('1096 Town Center Road', null, 'Ottawa', 'L6G0B4', 'Canada', 'Ontario')
    returning address_id as id
), p as (
    insert into phone_numbers (phone_number)
    values ('6471238238')
    returning phone_number_id as id
), e as (
    insert into emails (email)
    values ('hello@hackerhostel.ca')
    returning email_id as id
), b as (
    insert into hotel_brands (brand_name, address_id)
    values ('Hacker Hostel', (select id from a))
    returning hotel_brand_id as id
), be as (
    insert into office_emails (hotel_brand_id, email_id)
    values ((select id from b), (select id from e))
), bp as (
    insert into office_phones (hotel_brand_id, phone_number_id)
    values ((select id from b), (select id from p))
) select id from b;

with a as (
    insert into addresses (address, unit, locality, postal, country, admin_area)
    values ('325 Dalhousie Street', null, 'Ottawa', 'K1N 7G1', 'Canada', 'Ontario')
    returning address_id as id
), p as (
    insert into phone_numbers (phone_number)
    values ('6133211234')
    returning phone_number_id as id
), e as (
    insert into emails (email)
    values ('Ottawa.guest@andaz.com')
    returning email_id as id
), b as (
    insert into hotel_brands (brand_name, address_id)
    values ('Andaz Ottawa Byward Market - a concept by Hyatt', (select id from a))
    returning hotel_brand_id as id
), be as (
    insert into office_emails (hotel_brand_id, email_id)
    values ((select id from b), (select id from e))
), bp as (
    insert into office_phones (hotel_brand_id, phone_number_id)
    values ((select id from b), (select id from p))
) select id from b;