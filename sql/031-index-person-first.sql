-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-27
-- File: 031-index-person-first.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'CREATE TABLE: person' FROM dual;

DROP TABLE IF EXISTS person;

CREATE TABLE person
(
  id        INTEGER         NOT NULL,
  last      VARCHAR(150)    NOT NULL,
  first     VARCHAR(150)    NOT NULL,
  phone     INTEGER,
  city      VARCHAR(150),
  address   VARCHAR(150),
  dob       DATE,
  CONSTRAINT person__id_pk PRIMARY KEY (id)
);

COMMIT;
BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'CREATE INDEX: person__first_index' FROM dual;

CREATE INDEX IF NOT EXISTS person__first_index
ON person (first);

COMMIT;