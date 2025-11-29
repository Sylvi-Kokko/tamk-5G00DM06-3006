-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 034-index-person-phone-remove.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'DROP INDEX: person__first_index' FROM dual;
DROP INDEX IF EXISTS person__first_index;

SELECT dummy AS 'DROP INDEX: person__last_index' FROM dual;
DROP INDEX IF EXISTS person__last_index;

SELECT dummy AS 'DROP INDEX: phone__number_index' FROM dual;
DROP INDEX IF EXISTS phone__number_index;

COMMIT;