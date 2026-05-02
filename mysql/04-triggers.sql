DELIMITER $$

CREATE TRIGGER BEFORE_INSERT_DEPOSIT BEFORE INSERT ON deposits FOR EACH ROW BEGIN
	DECLARE current_balance DECIMAL(15,2);
    
    SELECT balance INTO current_balance FROM user_cards WHERE id = NEW.source_card_id;
    
    IF current_balance < NEW.amount THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Insufficient balance for the deposit';
	END IF;
    
    IF NEW.amount <= 0 THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: The amount can not be 0 or less';
	END IF;
    

END $$

CREATE TRIGGER AFTER_INSERT_DEPOSITS AFTER INSERT ON deposits FOR EACH ROW BEGIN
	UPDATE user_cards SET balance = balance - NEW.amount WHERE id = NEW.source_card_id;
    
    UPDATE user_cards SET balance = balance + NEW.amount WHERE id = NEW.destination_card_id;

    INSERT INTO transactions(user_id, source_card_id, destination_card_id, amount, message, folio, type, created_at) 
    VALUES( NEW.sender_id, NEW.source_card_id, NEW.destination_card_id, NEW.amount, '', NEW.folio, 'income', NEW.created_at);

END$$

CREATE TRIGGER BEFORE_INSERT_SERVICE_PAYMENTS BEFORE INSERT ON service_payments FOR EACH ROW BEGIN
	DECLARE current_balance DECIMAL(15,2);  
    
    SELECT balance INTO current_balance FROM user_cards WHERE id = NEW.card_id;
    
    IF current_balance < NEW.amount THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Insufficient balance for the pay of the service';
	END IF;
    
    IF NEW.amount <= 0 THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: The amount can not be 0 or less';
	END IF;
    
    
    
    
END$$

CREATE TRIGGER AFTER_INSERT_PAYMENTS AFTER INSERT ON service_payments FOR EACH ROW BEGIN
	UPDATE user_cards SET balance = balance - NEW.amount WHERE id = NEW.card_id;
    
    INSERT INTO transactions(user_id, source_card_id, destination_card_id, amount, message, folio, type, created_at) 
    VALUES( NEW.sender_id, NEW.card_id, NULL, NEW.amount, NEW.service_name, NEW.folio, 'payment', NEW.created_at);

END$$


CREATE TRIGGER BEFORE_INSERT_TRANSFER BEFORE INSERT ON transfers FOR EACH ROW BEGIN
	DECLARE current_balance DECIMAL(15,2);
    DECLARE recipient_exists INT;
    
    SELECT balance INTO current_balance FROM user_cards WHERE id = NEW.source_card_id;
    SELECT COUNT(*) INTO recipient_exists FROM users WHERE email = NEW.recipient_email AND active = 1;
    
    IF current_balance < NEW.amount THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Insufficient balance for the transfer';
	END IF;
    
    IF recipient_exists = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Email not found';
    END IF;
    
    IF NEW.amount <= 0 THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: El monto a transferir no puede ser 0';
	END IF;
    
    
END $$

CREATE TRIGGER AFTER_INSERT_TRANSFER AFTER INSERT ON transfers FOR EACH ROW BEGIN

	UPDATE user_cards SET balance = balance - NEW.amount WHERE id = NEW.source_card_id;
    
    UPDATE user_cards SET balance = balance + NEW.amount WHERE id = NEW.destination_card_id;
	
    INSERT INTO transactions(user_id, source_card_id, destination_card_id, amount, message, folio, type, created_at) 
    VALUES( NEW.sender_id, NEW.source_card_id, NEW.destination_card_id, NEW.amount, NEW.message, NEW.folio, 'transfer', NEW.created_at);
    
    INSERT INTO transactions(user_id, source_card_id, destination_card_id, amount, message, folio, type, created_at) 
    VALUES((SELECT id FROM users WHERE email = NEW.recipient_email), NEW.source_card_id, NEW.destination_card_id, NEW.amount, NEW.message, NEW.folio, 'income', NEW.created_at);

END$$

CREATE TRIGGER BEFORE_INSERT_WITHDRAWALS BEFORE INSERT ON withdrawals FOR EACH ROW BEGIN
	DECLARE current_balance DECIMAL(15,2);
    
    SELECT balance INTO current_balance FROM user_cards WHERE id = NEW.card_id;
    
    IF current_balance < NEW.amount THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Insufficient balance for the withdrawal';
	END IF;
    
    IF NEW.amount <= 0 THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: The amount can not be 0 or less';
	END IF;
    

END$$

CREATE TRIGGER AFTER_INSERT_WITHDRAWAL AFTER INSERT ON withdrawals FOR EACH ROW BEGIN
	UPDATE user_cards SET balance = balance - NEW.amount WHERE id = NEW.card_id;
    
    INSERT INTO transactions(user_id, source_card_id, destination_card_id, amount, message, folio, type, created_at) 
    VALUES( NEW.user_id, NEW.card_id, NULL, NEW.amount, '', NEW.folio, 'withdrawal', NEW.created_at);

END$$



DELIMITER ;

