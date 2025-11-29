-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 061-update-person-1.sql

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'UPDATE: person' FROM dual;

UPDATE person
SET address = '21th Street'
WHERE first = 'John' AND last = 'Doe';

COMMIT;