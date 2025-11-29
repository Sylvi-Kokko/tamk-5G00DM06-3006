-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 033-index-phone-number.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'CREATE TABLE: phone' FROM dual;

DROP TABLE IF EXISTS phone;

CREATE TABLE phone
(
  id        INTEGER         NOT NULL,
  number    VARCHAR(12)    NOT NULL,
  comment   VARCHAR(100),
  CONSTRAINT phone__id_pk
    PRIMARY KEY (id),
);

CREATE UNIQUE INDEX IF NOT EXISTS phone__number_index ON phone (number);

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

  CONSTRAINT person__id_pk
    PRIMARY KEY (id),

  CONSTRAINT person__phone_fk
    FOREIGN KEY (phone)
    REFERENCES phone (id),
);

COMMIT;