drop table demandeVoyages;
drop table demandeGroupes;
drop table groupeMembers;
drop table voyages;
drop table groupes;
drop table users;
drop table villes;
drop table hotels;
drop table reservations;



select * from users;

create table users(
	id int primary key auto_increment,
    firstname varchar(25) not null,
    lastname varchar(25) not null,
    username varchar(25) not null,
    mobile varchar(10) not null,
    email varchar(50) not null,
    passwordHash varchar(50) not null
);

create table groupes(
	id int primary key auto_increment,
    title varchar(20) not null,
    groupeDescription text not null,
    image blob not null
);

create table voyages(
	id int primary key auto_increment,
    adminId int not null,
    groupeId int not null,
    price float not null,
    dateStart date not null,
    dateEnd date,
    capacite int,
    descriptionVoyage text not null,
    foreign key(adminId) references users(id)
);





create table groupeMembers(
	id int primary key auto_increment,
    groupeId int not null,
    userId int not null,
    groupeRole varchar(20) default('membre'),
    foreign key(userId) references users(id),
    foreign key(groupeId) references groupes(id)
);



create table demandeGroupes(
	id int primary key auto_increment,
	userId int not null, 
    groupeId int not null,
    motivation text,
    demandeStatus boolean default(false),
    foreign key(userId) references users(id),
    foreign key(groupeId) references groupes(id)
);
create table demandeVoyages(
	id int primary key auto_increment,
	userId int not null, 
    voyageId int not null,
    demandeStatus boolean default false,
     foreign key(userId) references users(id),
    foreign key(voyageId) references voyages(id)
);

create table villes(
	id int primary key auto_increment,
    nomVille varchar(30) not null,
    pays varchar(30) not null
);

create table hotels(
	id int primary key auto_increment,
    villeId int not null,
    nomHotel varchar(30) not null,
    capacite varchar(30),
    descriptionHotel text,
    foreign key(villeId) references villes(id)
);

create table reservations(
	id int primary key auto_increment,
    voyageId int not null,
    hotelId int not null,
    userId int not null,
    nbrNuits int not null,
    foreign key(userId) references users(id),
    foreign key(voyageId) references voyages(id),
    foreign key(hotelId) references hotels(id)
);

create table postes(
	id int primary key auto_increment,
    userId int not null,
    groupeId int default(0),
    title varchar(255) not null,
    content text not null,
	foreign key(userId) references users(id),
	foreign key(groupeId) references groupes(id)
);
create table commentaires(
	id int primary key auto_increment,
    userId int,
    posteId int,
    contenu text,
    foreign key(userId) references users(id),
	foreign key(posteId) references postes(id)
);

select * from groupes;

select * from groupemembers;


alter table groupes add image varchar(255);

select * from groupes;

delete from groupes where image is null ;

select * from groupes;

insert into groupes(title, groupeDescription) values('kjfdhkjfs', 'jfhskhfkshkdf');

alter table groupes modify column image blob;

select * from groupemembers;

select * from demandegroupes;

select * from users;

select * from groupes;

select * from demandegroupes;
select * from groupemembers;

insert into groupemembers(groupeId, userId, groupeRole) values(1, 1, 'admin');

select * from groupes;

select * from postes;

