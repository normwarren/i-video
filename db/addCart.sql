
INSERT INTO ivideo.cart (user_id)
    VALUES (${user_id})
ON CONFLICT (user_id) DO UPDATE
SET updated_at = CURRENT_TIMESTAMP 
WHERE EXISTS(SELECT 1 FROM ivideo.cart ca WHERE ca.user_id = ${user_id})
RETURNING id
