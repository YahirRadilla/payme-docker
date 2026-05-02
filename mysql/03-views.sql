USE payme;


CREATE OR REPLACE VIEW deposit_view AS
SELECT 
    t.id,
    t.user_id,
    t.source_card_id,
    t.destination_card_id,
    t.type,
    t.amount,
    t.folio,
    t.message,
    t.created_at
FROM transactions t
WHERE t.type = 'income';


CREATE OR REPLACE VIEW payment_view AS
SELECT 
    t.id,
    t.user_id,
    t.source_card_id,
    t.destination_card_id,
    t.type,
    t.amount,
    t.folio,
    t.message,
    t.created_at
FROM transactions t
WHERE t.type = 'payment';


CREATE OR REPLACE VIEW transfer_view AS
SELECT 
    t.id,
    t.user_id,
    t.source_card_id,
    t.destination_card_id,
    t.type,
    t.amount,
    t.folio,
    t.message,
    t.created_at
FROM transactions t
WHERE t.type = 'transfer';


CREATE OR REPLACE VIEW withdrawal_view AS
SELECT 
    t.id,
    t.user_id,
    t.source_card_id,
    t.destination_card_id,
    t.type,
    t.amount,
    t.folio,
    t.message,
    t.created_at
FROM transactions t
WHERE t.type = 'withdrawal';