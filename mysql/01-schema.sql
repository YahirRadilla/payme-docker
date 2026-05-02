USE payme;


CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(100) NOT NULL,
  first_lastname varchar(65) NOT NULL,
  phone char(10) NOT NULL,
  email varchar(65) NOT NULL,
  password varchar(255) NOT NULL,
  active int NOT NULL DEFAULT '1',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY phone (phone),
  UNIQUE KEY email (email)
) ENGINE=INNODB;



CREATE TABLE user_cards (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  card_number char(16) NOT NULL,
  expiration_date date NOT NULL,
  cvv char(3) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  balance decimal(15,2) DEFAULT '0.00',
  PRIMARY KEY (id),
  UNIQUE KEY card_number (card_number),
  KEY user_id (user_id),
  CONSTRAINT user_cards_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE transfers (
  id int NOT NULL AUTO_INCREMENT,
  sender_id int NOT NULL,
  recipient_email varchar(65) NOT NULL,
  folio varchar(20) NOT NULL,
  source_card_id int NOT NULL,
  destination_card_id int NOT NULL,
  amount decimal(15,2) NOT NULL,
  message varchar(150) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY sender_id (sender_id),
  KEY source_card_id (source_card_id),
  KEY destination_card_id (destination_card_id),
  CONSTRAINT transfers_ibfk_1 FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT transfers_ibfk_2 FOREIGN KEY (source_card_id) REFERENCES user_cards (id) ON DELETE CASCADE,
  CONSTRAINT transfers_ibfk_3 FOREIGN KEY (destination_card_id) REFERENCES user_cards (id) ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE service_payments (
  id int NOT NULL AUTO_INCREMENT,
  sender_id int NOT NULL,
  card_id int NOT NULL,
  folio varchar(20) NOT NULL,
  service_name varchar(100) NOT NULL,
  reference varchar(20) NOT NULL,
  amount decimal(15,2) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY sender_id (sender_id),
  KEY card_id (card_id),
  CONSTRAINT service_payments_ibfk_1 FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT service_payments_ibfk_2 FOREIGN KEY (card_id) REFERENCES user_cards (id) ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE deposits (
  id int NOT NULL AUTO_INCREMENT,
  sender_id int NOT NULL,
  source_card_id int NOT NULL,
  folio varchar(20) NOT NULL,
  destination_card_id int NOT NULL,
  amount decimal(15,2) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY sender_id (sender_id),
  KEY source_card_id (source_card_id),
  KEY destination_card_id (destination_card_id),
  CONSTRAINT deposits_ibfk_1 FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT deposits_ibfk_2 FOREIGN KEY (source_card_id) REFERENCES user_cards (id) ON DELETE CASCADE,
  CONSTRAINT deposits_ibfk_3 FOREIGN KEY (destination_card_id) REFERENCES user_cards (id) ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE withdrawals (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  folio varchar(20) NOT NULL,
  card_id int NOT NULL,
  amount decimal(15,2) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  KEY card_id (card_id),
  CONSTRAINT withdrawals_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT withdrawals_ibfk_2 FOREIGN KEY (card_id) REFERENCES user_cards (id) ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE transactions (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  source_card_id int NOT NULL,
  destination_card_id int DEFAULT NULL,
  type enum('transfer','payment','income','withdrawal') NOT NULL,
  amount decimal(15,2) NOT NULL,
  folio varchar(20) NOT NULL,
  message varchar(150) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  KEY source_card_id (source_card_id),
  KEY destination_card_id (destination_card_id),
  CONSTRAINT transactions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT transactions_ibfk_2 FOREIGN KEY (source_card_id) REFERENCES user_cards (id) ON DELETE CASCADE,
  CONSTRAINT transactions_ibfk_3 FOREIGN KEY (destination_card_id) REFERENCES user_cards (id) ON DELETE CASCADE
) ENGINE=INNODB;





