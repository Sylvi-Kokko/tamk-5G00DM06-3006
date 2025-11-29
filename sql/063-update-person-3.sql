-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 063-update-person-3.sql

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'UPDATE: person' FROM dual;

UPDATE person
SET city = 'Denver'
WHERE first = 'Stephen';

COMMIT;