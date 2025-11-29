-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 062-update-person-2.sql

BEGIN TRANSACTION;
PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'UPDATE: phone' FROM dual;

UPDATE person
SET number = '+1 222 333 444'
WHERE first = 'Mike ';

COMMIT;