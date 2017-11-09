SELECT *
FROM vehicles
WHERE owner_id = (SELECT id
FROM users
WHERE email = $1);