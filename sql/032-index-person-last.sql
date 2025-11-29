-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 032-index-person-first.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);
INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'CREATE TABLE: person' FROM dual;

DROP TABLE IF EXISTS person;

CREATE TABLE person (
  id        INTEGER         NOT NULL,
  last      VARCHAR(150)    NOT NULL,
  first     VARCHAR(150)    NOT NULL,
  phone     INTEGER,
  city      VARCHAR(150),
  address   VARCHAR(150),
  dob       DATE,
  CONSTRAINT person__id_pk PRIMARY KEY (id)
);

SELECT dummy AS 'CREATE INDEX: person__last_index' FROM dual;

CREATE INDEX IF NOT EXISTS person__last_index
ON person (last);

COMMIT;