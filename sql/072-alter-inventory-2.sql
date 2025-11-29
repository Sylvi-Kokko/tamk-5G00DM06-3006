-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 072-alter-inventory-2.sql

PRAGMA foreign_keys = OFF;
BEGIN;
CREATE TABLE inventory (
  item    VARCHAR(150),
  worth INTEGER,
  comment VARCHAR(150)
);

ALTER TABLE inventory
RENAME TO old_inventory;

CREATE TABLE inventory(
  item VARCHAR(150) NOT NULL,
  worth INTEGER,
  comment VARCHAR(150)
);

INSERT INTO inventory (item, worth, comment) SELECT item, worth, comment FROM old_inventory;

DROP TABLE old_inventory;

COMMIT;