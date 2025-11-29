-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 023-domain-constraints-project.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'CREATE TABLE: project' FROM dual;

DROP TABLE IF EXISTS project;

CREATE TABLE project
(
  id        INTEGER         NOT NULL,
  project_name      VARCHAR(150)    NOT NULL,
  manager_name     VARCHAR(150)    NOT NULL,
  manager_phone_number     NUMBER,
  manger_title      VARCHAR(150),
  CONSTRAINT project__id_pk PRIMARY KEY (id),
  CONSTRAINT project__name_ck CHECK (length(project_name) > 5),
  CONSTRAINT project__manag_ck CHECK (length(manager_name) > 5),
  CONSTRAINT project__manag_title_ck CHECK (manger_title IN (
    'sales manager',
    'office manager',
    'facilities manager',
    'business manager')
);

COMMIT;

-- Fails job title not in the list
INSERT INTO project (project_id, project_name, manager_name, manager_phone_number, manger_title)
VALUES (1, 'New Website Launch', 'Alice Johnson', 1234567890, 'sales');

-- Fails project manager name too short
INSERT INTO project (project_id, project_name, manager_name, manager_phone_number, manger_title)
VALUES (2, 'App Development', 'Bob', 9876543210, 'business manager');