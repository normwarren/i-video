INSERT INTO ivideo.cart_items(cart_id, product_id, cart_prod_key, quantity, price)
	SELECT ${cart_id}, ${product_id}, CAST(CONCAT(${cart_id},${product_id}) AS INTEGER), 1, ${product_price}
	ON CONFLICT (cart_prod_key) DO UPDATE
	SET updated_at = CURRENT_TIMESTAMP, price = ${product_price}
