SELECT SUM(ci.price) as total_price
FROM ivideo.cart c
JOIN ivideo.cart_items ci ON ci.cart_id = c.id
JOIN ivideo.video_series_product p ON p.id = ci.product_id
JOIN ivideo.user u ON u.id = c.user_id
WHERE user_id = ${user_id}