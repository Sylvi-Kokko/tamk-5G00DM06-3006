-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 021-domain-constraints-person.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

DROP TABLE IF EXISTS person;

CREATE TABLE person
(
    id        INTEGER         NOT NULL,
    last      VARCHAR(150)    NOT NULL,
    first     VARCHAR(150)    NOT NULL,
    phone     INTEGER    NOT NULL,
    city      VARCHAR(150)    NOT NULL,
    address   VARCHAR(150)    NOT NULL,
    dob       DATE    NOT NULL,
    CONSTRAINT person__id_pk
      PRIMARY KEY (id),

    CONSTRAINT person__phone_fk
      FOREIGN KEY (phone)
      REFERENCES phone (id),
    CHECK (length(phone) > 5),
    CHECK (date(dob) > '1930-12-31')
);

COMMIT;

-- Fails, too short phone number
INSERT INTO person (person_id, last_name, first_name, phone, dob)
VALUES (1, 'Doe', 'John', '12345', '1980-01-01');
-- Fails, dob before 1931-01-01
INSERT INTO person (person_id, last_name, first_name, phone, dob)
VALUES (2, 'Smith', 'Jane', '+358123456', '1920-05-10');