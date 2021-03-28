alter table hotel_employees add column if not exists role_id int not null references roles(role_id);

