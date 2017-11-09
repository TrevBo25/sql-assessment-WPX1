UPDATE vehicles
SET owner_id = $1
WHERE id = $2
RETURNING *;