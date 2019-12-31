USE `apartments`;
insert into city (name, country_code, state, postal_code) values ('city1', 'Pl', 'Poland' ,'02-237');

insert into user (email, password, name, lastname, phone, profile, id_city, street, enabled)
values ('test1@email.com', 'password1', 'name1','lastname1','1111','user',1,'street1',1);

insert into user (email, password, name, lastname, phone, profile, id_city, street, enabled)
values ('test2@email.com', 'password2', 'name2','lastname2','22222','admin',1,'street1',1);

insert into user (email, password, name, lastname, phone, profile, id_city, street, enabled)
values ('test3@email.com', 'password3', 'name3','lastname3','3333','owner',1,'street1',1);


insert into hotel (name, rating, description, id_owner, id_city, street, enabled)
values ('name1', 5, 'description1',6,1,'street1',1);

insert into hotel (name, rating, description, id_owner, id_city, street, enabled)
values ('name2', 5, 'description2',6,1,'street2',1);

insert into apartment (id_hotel, name, size, price, status)
values (1, 'name1', 10, 20, 'free');

insert into apartment (id_hotel, name, size, price, status)
values (2, 'name2', 5, 15, 'free');

insert into apartment (id_hotel, name, size, price, status)
values (2, 'name2', 5, 15, 'free');

insert into apartment (id_hotel, name, size, price, status)
values (2, 'name2', 5, 15, 'free');

insert into reservation (date_start, date_end, price, id_apartment, id_user, status)
values (STR_TO_DATE('1-01-2012', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), 30, 1,3,'confirmed');

commit;
