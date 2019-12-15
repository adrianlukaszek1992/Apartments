
--
CREATE DATABASE IF NOT EXISTS `apartments` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apartments`;



CREATE TABLE IF NOT EXISTS `apartment` (
  `id_apartment` int(10) NOT NULL AUTO_INCREMENT,
  `id_hotel` int(11) DEFAULT NULL,
  `name` varchar(60) COLLATE utf8_polish_ci DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `status` varchar(100) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id_apartment`),
  UNIQUE KEY `id_UNIQUE` (`id_apartment`),
  KEY `room_hotel_fk_idx` (`id_hotel`)
)



CREATE TABLE IF NOT EXISTS `city` (
  `id_city` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_polish_ci DEFAULT NULL,
  `country_code` varchar(3) COLLATE utf8_polish_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8_polish_ci DEFAULT NULL,
  `postal_code` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id_city`)
)



CREATE TABLE IF NOT EXISTS `hotel` (
  `id_hotel` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_polish_ci DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `description` varchar(2000) COLLATE utf8_polish_ci DEFAULT NULL,
  `id_owner` int(10) DEFAULT NULL,
  `id_city` int(11) DEFAULT NULL,
  `street` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `enabled` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_hotel`),
  UNIQUE KEY `id_UNIQUE` (`id_hotel`),
  KEY `hotel_user_fk_idx` (`id_owner`),
  KEY `hotel_city_fk_idx` (`id_city`)
)


CREATE TABLE IF NOT EXISTS `reservation` (
  `id_reservation` int(10) NOT NULL AUTO_INCREMENT,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `price` float DEFAULT NULL,
  `id_apartment` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `status` varchar(60) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id_reservation`),
  UNIQUE KEY `id_UNIQUE` (`id_reservation`),
  KEY `reservation_room_fk_idx` (`id_apartment`),
  KEY `reservation_user_fk_idx` (`id_user`)
)



CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `profile`  varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `id_city` int(11) DEFAULT NULL,
  `street` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `enabled` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_UNIQUE` (`id_user`),
  KEY `user_city_fk_idx` (`id_city`)
)


ALTER TABLE `apartment`
  ADD CONSTRAINT `room_hotel_fk` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id_hotel`) ON DELETE NO ACTION ON UPDATE NO ACTION;


ALTER TABLE `hotel`
  ADD CONSTRAINT `hotel_city_fk` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `hotel_user_owner_fk` FOREIGN KEY (`id_owner`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;


ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_apartment_fk` FOREIGN KEY (`id_apartment`) REFERENCES `apartment` (`id_apartment`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `reservation_user_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT;


