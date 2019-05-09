
WITH u as (
INSERT INTO ivideo.user (email, first_name, last_name)
    VALUES (${email}, ${firstname}, ${lastname})
    RETURNING id
),
r AS (
   INSERT INTO ivideo.role(name)
	   VALUES('Registered')
	   RETURNING id
   ),
n AS (
  INSERT INTO ivideo.user_role(user_id, role_id)
    VALUES ((SELECT * FROM u), (SELECT * FROM r))
)
INSERT INTO ivideo.user_login (user_id, username, password)
    VALUES ((SELECT * FROM u), ${username}, ${hash})
  RETURNING
    username, password