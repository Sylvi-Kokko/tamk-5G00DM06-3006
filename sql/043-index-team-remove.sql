-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 043-index-team-remove.sql


PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);
INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'DROP INDEX: team__name_index' FROM dual;
DROP INDEX IF EXISTS team__name_index;

SELECT dummy AS 'DROP INDEX: team__owner_index' FROM dual;
DROP INDEX IF EXISTS team__owner_index;

COMMIT;