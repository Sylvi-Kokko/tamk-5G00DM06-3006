-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-27
-- File: 024-domain-constraints-course.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'CREATE TABLE: course' FROM dual;

DROP TABLE IF EXISTS course;

CREATE TABLE course
(
    id         INTEGER          NOT NULL,
    credits   INTEGER,
    date_begin  Date,
    duration    Integer,
    description VARCHAR(12),
    CONSTRAINT course_dur_ck CHECK (duration > 0 AND duration != 0),
    CONSTRAINT course__credits_ck  CHECK (credits BETWEEN 1 AND 30)
);

COMMIT;

SELECT dummy AS 'INSERT INTO: course' FROM dual;

--Fails negative duration
INSERT INTO course (id, credits, date_begin, duration, description)
VALUES (1, 3, '2020-01-10', -9, 'Economy');

--Fails zero credits
INSERT INTO course (id, credits, date_begin, duration, description)
VALUES (1, 0, '2020-01-10', 9, 'Economy');
