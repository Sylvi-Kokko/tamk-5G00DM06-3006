-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 041-index-team-name.sql

PRAGMA foreign_keys = ON;
PRAGMA defer_foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

SELECT dummy AS 'CREATE TABLE: team' FROM dual;

DROP TABLE IF EXISTS team;

CREATE TABLE team (
  coach_last VARCHAR(150),
  coach_first VARCHAR(150),
  team_name VARCHAR(150) NOT NULL,
  owner VARCHAR(150),
  CONSTRAINT team__pk
   PRIMARY KEY (team_name),
);

SELECT dummy AS 'CREATE INDEX: team__name_index' FROM dual;

CREATE INDEX IF NOT EXISTS team__name_index ON team (team_name);

COMMIT;