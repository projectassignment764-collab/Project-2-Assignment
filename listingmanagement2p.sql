USE `campusnest`;

ALTER TABLE `properties`
  MODIFY `property_name`  VARCHAR(100)   NOT NULL,
  MODIFY `city`            VARCHAR(50)    NOT NULL,
  MODIFY `address`         VARCHAR(255)   NOT NULL,
  MODIFY `total_rooms`     INT(11)        NOT NULL,
  MODIFY `available_rooms` INT(11)        NOT NULL DEFAULT 0,
  MODIFY `price_per_month` DECIMAL(8,2)   NOT NULL;

CREATE TABLE `amenities` (
  `amenity_id`   INT(11)      NOT NULL AUTO_INCREMENT,
  `amenity_name` VARCHAR(50)  NOT NULL,
  `icon`         VARCHAR(10)  DEFAULT NULL,
  PRIMARY KEY (`amenity_id`),
  UNIQUE KEY `amenity_name` (`amenity_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `amenities` (`amenity_id`, `amenity_name`, `icon`) VALUES
(1, 'Furnished Rooms',    '🛏️'),
(2, 'Fibre WiFi',         '📶'),
(3, 'Kitchen Access',     '🍳'),
(4, 'Free Parking',       '🅿️'),
(5, 'Laundry',            '🧺'),
(6, 'Study Areas',        '📚'),
(7, '24/7 Security',      '🛡️'),
(8, 'Private Bathrooms',  '🚿');

CREATE TABLE `property_amenities` (
  `property_id` INT(11) NOT NULL,
  `amenity_id`  INT(11) NOT NULL,
  PRIMARY KEY (`property_id`, `amenity_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `property_amenities_ibfk_1`
    FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `property_amenities_ibfk_2`
    FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`amenity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `property_amenities` (`property_id`, `amenity_id`) VALUES
(1, 1), (1, 2), (1, 7),
(2, 2), (2, 4), (2, 7),
(3, 1), (3, 6), (3, 7),
(4, 5), (4, 3), (4, 2),
(5, 2), (5, 5), (5, 8);

DELIMITER $$

DROP TRIGGER IF EXISTS `trg_properties_status_insert`$$
CREATE TRIGGER `trg_properties_status_insert`
BEFORE INSERT ON `properties`
FOR EACH ROW
BEGIN
  IF NEW.available_rooms <= 0 THEN
    SET NEW.status = 'Full';
  ELSE
    SET NEW.status = 'Available';
  END IF;
END$$

DROP TRIGGER IF EXISTS `trg_properties_status_update`$$
CREATE TRIGGER `trg_properties_status_update`
BEFORE UPDATE ON `properties`
FOR EACH ROW
BEGIN
  IF NEW.available_rooms <= 0 THEN
    SET NEW.status = 'Full';
  ELSE
    SET NEW.status = 'Available';
  END IF;
END$$

DELIMITER ;
