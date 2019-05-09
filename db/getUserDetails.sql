select u.first_name, u.last_name, u.email, r.name from ivideo.user u
join ivideo.user_role ur on u.id = ur.user_id
join ivideo.role r ON r.id = ur.role_id
where u.id = ${id};