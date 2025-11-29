-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 054-index-weather-remove.sql

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);
INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'DROP INDEX: weather__time_of_reading_index' FROM dual;
DROP INDEX IF EXISTS weather__time_of_reading_index;

SELECT dummy AS 'DROP INDEX: weather__high_index' FROM dual;
DROP INDEX IF EXISTS weather__high_index;

SELECT dummy AS 'DROP INDEX: weather__low_index' FROM dual;
DROP INDEX IF EXISTS weather__low_index;

COMMIT;