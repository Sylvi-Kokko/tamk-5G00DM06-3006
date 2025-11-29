-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 074-alter-inventory-4.sql


PRAGMA foreign_keys = OFF;
BEGIN;
CREATE TABLE inventory (
  item    VARCHAR(150) NOT NULL,
  worth INTEGER,
  comment VARCHAR(150)
);

ALTER TABLE inventory
RENAME TO old_inventory;

CREATE TABLE inventory(
  item VARCHAR(150) ,
  worth INTEGER,
  comment VARCHAR(150)
  CONSTRAINT inventory__comment_ck DEFAULT ('No comment')
);

INSERT INTO inventory (item, worth, comment) SELECT item, worth, comment FROM old_inventory;

DROP TABLE old_inventory;

COMMIT;