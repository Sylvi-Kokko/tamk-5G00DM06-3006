-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 011-foreign-key-between-person-and-phone.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'CREATE TABLE: lecturer' FROM dual;

DROP TABLE IF EXISTS lecturer;

CREATE TABLE lecturer
(
   id          INTEGER       NOT NULL UNIQUE
   , name      VARCHAR(12)
   , CONSTRAINT course__id_pk
     PRIMARY KEY (id)
     FOREIGN KEY (course)
     REFERENCES course (id)
);

COMMIT;

SELECT dummy AS 'CREATE TABLE: course' FROM dual;

DROP TABLE IF EXISTS course;

CREATE TABLE course
(
    id         INTEGER          NOT NULL UNIQUE
    , credits   INTEGER
    , date_begin  Date
    , duration    Integer
    , description VARCHAR(12)
);



SELECT dummy AS 'INSERT INTO: lecturer' FROM dual;

INSERT INTO lecturer
    (id, name)
VALUES
    (1, 'John Doe')
;

INSERT INTO artist
    (id, name)
VALUES
    (2, 'Jane Doe')
;

INSERT INTO artist
    (id, name)
VALUES
    (3, 'Jari Aalto')
;



SELECT dummy AS 'INSERT INTO: course' from dual;

INSERT INTO course
    (id, credits, date_begin, duration, description)
VALUES
    (1, 3, 2020-01-10, 9, 'Economy' )
;

INSERT INTO course
    (id, credits, date_begin, duration, description)
VALUES
    (2, 5, 2020-02-15, 15, 'Chemistry' )
;

INSERT INTO course
    (id, credits, date_begin, duration, description)
VALUES
    (3, 2, 2020-02-20, 6, 'History' )
;

-- End of file