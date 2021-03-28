alter table roles add constraint unique_role_code unique (role_code);
alter table roles add column if not exists role_id int not null references roles(role_id);
