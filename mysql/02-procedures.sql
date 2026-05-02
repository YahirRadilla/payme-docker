
DELIMITER $$

CREATE PROCEDURE SP_CREATE_USER(
    IN _first_name VARCHAR(100), 
    IN _first_lastname VARCHAR(100), 
    IN _phone CHAR(10), 
    IN _email VARCHAR(65), 
    IN _password VARCHAR(255)
)
BEGIN 
	DECLARE user_exists INT;
    DECLARE user_exists_deactivate INT;
    
	SELECT COUNT(*) INTO user_exists FROM users WHERE email = _email;
    SELECT COUNT(*) INTO user_exists_deactivate FROM users WHERE email = _email AND active = 0;
    
    IF user_exists_deactivate = 1 THEN
        UPDATE users 
        SET active = 1, first_name = _first_name, first_lastname = _first_lastname, phone = _phone, password = _password WHERE email = _email;
    ELSEIF user_exists != 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: User with this email already exists';
    ELSE
		INSERT INTO users(first_name,first_lastname,phone, email, password) VALUES 
		(_first_name, _first_lastname,_phone,_email,_password);
    END IF;
END$$


CREATE PROCEDURE SP_CREATE_TRANSFER(
	IN _sender_id INT, 
    IN _recipient_email VARCHAR(65), 
    IN _source_card CHAR(16), 
    IN _amount DECIMAL(15, 2),
    IN _message VARCHAR(150)
)
BEGIN 
	DECLARE _folio VARCHAR(20);
	DECLARE match_user INT;
    DECLARE match_card INT;
    DECLARE _source_card_id INT;
    SET _folio = SUBSTRING(CONCAT('TRF-', UNIX_TIMESTAMP(), '-', _sender_id, '-', UUID()),1,20);
    
    SELECT id INTO _source_card_id FROM user_cards WHERE card_number = _source_card;
	SELECT id INTO match_user FROM users WHERE email = _recipient_email;
    SELECT id INTO match_card FROM user_cards WHERE user_id = match_user LIMIT 1;
	
    INSERT INTO transfers(sender_id, recipient_email, folio,source_card_id,destination_card_id,amount,message) VALUES 
    (_sender_id, _recipient_email, _folio,_source_card_id,match_card,_amount,_message);
    
END$$


CREATE PROCEDURE SP_CREATE_SERVICE_PAYMENT(
	IN _sender_id INT, 
    IN _card CHAR(16), 
    IN _service_name VARCHAR(100),
    IN _reference VARCHAR(20),
    IN _amount DECIMAL(15, 2)
)
BEGIN 
    DECLARE _folio VARCHAR(20);
    DECLARE _card_id INT;
    SET _folio = SUBSTRING(CONCAT('SPF-', UNIX_TIMESTAMP(), '-', _sender_id, '-', UUID()),1,20);

    SELECT id INTO _card_id FROM user_cards WHERE card_number = _card;

    INSERT INTO service_payments(sender_id, folio, card_id, service_name, reference, amount) VALUES 
    (_sender_id, _folio, _card_id,_service_name,_reference,_amount);
    
END$$



CREATE PROCEDURE SP_CREATE_SERVICE_WITHDRAWAL(
	IN _user_id INT, 
    IN _card CHAR(16), 
    IN _amount DECIMAL(15, 2)
)
BEGIN 
	DECLARE _folio VARCHAR(20);
	DECLARE _card_id INT;
	
	SET _folio = SUBSTRING(CONCAT('WDF-', UNIX_TIMESTAMP(), '-', _user_id, '-', UUID()),1,20);
    
	SELECT id INTO _card_id FROM user_cards WHERE card_number = _card;
    
    INSERT INTO withdrawals(user_id, card_id, folio, amount) VALUES 
    (_user_id, _card_id,_folio,_amount);
    
END$$

CREATE PROCEDURE SP_CREATE_DEPOSIT(
	IN _sender_id INT, 
    IN _source_card CHAR(16), 
    IN _destination_card CHAR(16), 
    IN _amount DECIMAL(15, 2)
)
BEGIN 
	DECLARE _folio VARCHAR(20);
	DECLARE _source_card_id INT;
    DECLARE _destination_card_id INT;
    
	SET _folio = SUBSTRING(CONCAT('DPF-', UNIX_TIMESTAMP(), '-', _sender_id, '-', UUID()),1,20);

	SELECT id INTO _source_card_id FROM user_cards WHERE card_number = _source_card;
    SELECT id INTO _destination_card_id FROM user_cards WHERE card_number = _destination_card;

    INSERT INTO deposits(sender_id, source_card_id, destination_card_id, folio, amount) VALUES 
    (_sender_id, _source_card_id, _destination_card_id,_folio,_amount);
    
END$$

CREATE PROCEDURE SP_CREATE_USER_CARD(
    IN _user_id INT,
    IN _card_number CHAR(16),
    IN _expiration_date DATE,
    IN _cvv CHAR(3),
    IN _balance DECIMAL(15, 2)
)
BEGIN
    INSERT INTO user_cards(user_id, card_number, expiration_date, cvv, balance) 
    VALUES (_user_id, _card_number, _expiration_date, _cvv, _balance);
END$$


CREATE PROCEDURE SP_CREATE_WITHDRAWAL(
	IN _user_id INT, 
    IN _card CHAR(16), 
    IN _amount DECIMAL(15, 2)
)
BEGIN 
	DECLARE _folio VARCHAR(20);
	DECLARE _card_id INT;
	
	SET _folio = SUBSTRING(CONCAT('WDF-', UNIX_TIMESTAMP(), '-', _user_id, '-', UUID()),1,20);
    
	SELECT id INTO _card_id FROM user_cards WHERE card_number = _card;
    
    INSERT INTO withdrawals(user_id, card_id, folio, amount) VALUES 
    (_user_id, _card_id,_folio,_amount);
    
END$$

CREATE PROCEDURE SP_DELETE_USER(
	IN _id INT
)
BEGIN
	UPDATE users SET active = 0 WHERE id = _id;
END$$

CREATE PROCEDURE SP_FILTER(
	IN _id INT,
    IN _date_transaction DATE,
    IN _type VARCHAR(50)
)
BEGIN
    SELECT 
        id, 
        user_id, 
        folio, 
        source_card_id, 
        destination_card_id, 
        type, 
        amount, 
        message, 
        created_at
    FROM 
        transactions
    WHERE 
        (_date_transaction IS NULL OR DATE(created_at) = _date_transaction)
        AND (_type IS NULL OR type = _type)
        AND id = _id;
END$$

CREATE PROCEDURE SP_FILTER_DATE(
	IN _date_transaction DATE
)
BEGIN
	SELECT id, user_id, source_card_id, destination_card_id, type, amount, message, created_at
	FROM transactions
	WHERE DATE(created_at) = _date_transaction;
END$$

CREATE PROCEDURE SP_UPDATE_PASSWORD(
	IN _id INT,
    IN _password VARCHAR(255)
)
BEGIN
	UPDATE users SET password = _password WHERE id = _id;
END$$

CREATE PROCEDURE SP_UPDATE_USER(
	IN _id INT,
	IN _firstName VARCHAR(100),
	IN _firstLastName VARCHAR(65),
    IN _phone CHAR(10),
    IN _email VARCHAR(65)
)
BEGIN
	UPDATE users SET first_name = _firstName, first_lastname= _firstLastName, phone = _phone, email = _email WHERE id = _id;
END$$



DELIMITER ;

