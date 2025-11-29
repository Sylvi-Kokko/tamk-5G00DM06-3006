-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 064-update-person-4.sql

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'UPDATE: person' FROM dual;

UPDATE person
SET city = 'Miami'
WHERE first = 'John' AND last = 'Doe';

COMMIT;