alter table customers add column phone_number text;

update customers set phone_number = '('
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT
    || ') '
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT
    || '-'
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT
    || (RANDOM() * 9)::INT;