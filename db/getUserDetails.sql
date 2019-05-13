select u.id as user_id, u.first_name as firstname, u.last_name as lastname, u.email, r.name from ivideo.user u
join ivideo.user_role ur on u.id = ur.user_id
join ivideo.role r ON r.id = ur.role_id
where u.id = ${id};