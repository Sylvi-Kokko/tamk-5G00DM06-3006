-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 075-alter-inventory-5.sql

PRAGMA foreign_keys = OFF;
BEGIN;
CREATE TABLE inventory (
  item    VARCHAR(150),
  worth INTEGER,
  comment VARCHAR(150)
);

ALTER TABLE inventory
RENAME TO old_inventory;

CREATE TABLE inv(
  item VARCHAR(250),
  worth INTEGER,
  comment VARCHAR(250)
);

INSERT INTO inv (item, worth, comment) SELECT item, worth, comment FROM old_inventory;

DROP TABLE old_inventory;

COMMIT;