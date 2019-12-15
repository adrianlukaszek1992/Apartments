USE `apartments`;
insert into city (name, country_code, state, postal_code) values ('city1', 'Pl', 'Poland' ,'02-237');

insert into user (email, password, name, lastname, phone, profile, id_city, street, enabled)
values ('test1@email.com', 'password1', 'name1','lastname1','1111','user',1,'street1',1);

insert into user (email, password, name, lastname, phone, profile, id_city, street, enabled)
values ('test2@email.com', 'password2', 'name2','lastname2','22222','admin',1,'street1',1);

insert into user (email, password, name, lastname, phone, profile, id_city, street, enabled)
values ('test3@email.com', 'password3', 'name3','lastname3','3333','owner',1,'street1',1);
commit;
