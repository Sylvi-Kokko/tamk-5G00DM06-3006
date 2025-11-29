-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-28
-- File: 011-foreign-key-between-person-and-phone.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'CREATE TABLE: phone' FROM dual;

DROP TABLE IF EXISTS phone;

CREATE TABLE phone (
  id        INTEGER         NOT NULL,
  number    VARCHAR(12)    NOT NULL,
  comment   VARCHAR(100),

  CONSTRAINT phone__id_pk
    PRIMARY KEY (id),
);

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

  CONSTRAINT person__id_pk
    PRIMARY KEY (id),

  CONSTRAINT person__phone_fk
    FOREIGN KEY (phone)
    REFERENCES phone (id),
);

COMMIT;

SELECT dummy AS 'INSERT INTO: phone (valid)' FROM dual;

INSERT INTO phone (id, number, comment)
VALUES (1, '+1 111 222 333', 'work');

INSERT INTO phone (id, number, comment)
VALUES (2, '+1 222 333 333', 'work');

INSERT INTO phone (id, number, comment)
VALUES (3, '+1 333 444 555', 'home');

SELECT dummy AS 'INSERT INTO: person (valid)' FROM dual;

INSERT INTO person
(id, last, first, phone, city, address, dob)
VALUES
(1, 'Doe', 'John', 1, 'New York', '12th Street', '1970-01-10');

INSERT INTO person
(id, last, first, phone, city, address, dob)
VALUES
(2, 'Jordan', 'Mike', 2, 'Washington', 'South Park Bd 3', '1983-12-01');

INSERT INTO person
(id, last, first, phone, city, address, dob)
VALUES
(3, 'Durak', 'Stephen', 3, 'Florida', 'Sea Drive 112', '2020-04-30');

SELECT dummy AS 'INSERT INTO: person (FAIL expected)' FROM dual;

-- phone = 99 does not exist
INSERT INTO person
(id, last, first, phone, city, address, dob)
VALUES
(10, 'Fail', 'MissingPhone', 99, 'Nowhere', 'No Address', '2000-01-01');

-- phone = 5 does not exist
INSERT INTO person
(id, last, first, phone, city, address, dob)
VALUES
(11, 'Another', 'BadRef', 5, 'Nowhere', 'No Address', '2000-01-01');

-- Example of inserting before phone exists
INSERT INTO person
(id, last, first, phone)
VALUES
(20, 'Pre', 'PhoneInsert', 1);

-- End of file