alter table roles add column if not exists role_code text unique not null;

insert into roles (title, role_code)
    VALUES ('Manager', 'manager'), ('Housekeeper', 'housekeeper'), ('Concierge', 'concierge'), ('Security', 'security');