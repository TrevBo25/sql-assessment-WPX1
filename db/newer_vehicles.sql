SELECT vehicles.id, vehicles.make, vehicles.model, vehicles.year, vehicles.owner_id, users.name
FROM vehicles
JOIN users on vehicles.owner_id = users.id
WHERE year > 2000
ORDER BY year DESC
