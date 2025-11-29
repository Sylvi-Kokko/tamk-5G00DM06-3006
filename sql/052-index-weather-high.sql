-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 052-index-weather-high.sql

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'CREATE TABLE: weather' FROM dual;

DROP TABLE IF EXISTS weather;

CREATE TABLE weather (
  time_of_reading DATETIME,
  high NUMERIC,
  low NUMERIC,
  observer VARCHAR(3),
  Comment VARCHAR(150),
);

SELECT dummy AS 'CREATE INDEX: weather__high_index' FROM dual;

CREATE INDEX IF NOT EXISTS weather__high_index ON weather (high);

COMMIT;