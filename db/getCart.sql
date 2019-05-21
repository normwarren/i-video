SELECT u.first_name, u.last_name, u.email, 
p.name, ci.price, ci.cart_id, ci.id as cart_item_id
FROM ivideo.cart c
JOIN ivideo.cart_items ci ON ci.cart_id = c.id
JOIN ivideo.video_series_product p ON p.id = ci.product_id
JOIN ivideo.user u ON u.id = c.user_id
WHERE user_id = ${user_id}