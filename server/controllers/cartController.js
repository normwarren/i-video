module.exports = {
  addToCart: async (req, res) => {
    const { user_id, product_id, product_price } = req.body;
    Number(product_price);
    const db = req.app.get("db");
    try {
      let cart_id = await db.addCart({ user_id });
      await db.addCartItems({
        cart_id: cart_id[0]["id"],
        product_id,
        product_price
      });
      res.sendStatus(200); //send data for web visual of cart ?
    } catch (err) {
      res.sendStatus(500);
    }
  },
  getCartById: async (req, res) => {
    const db = req.app.get("db");
    const user_id = parseInt(req.query.id);
    try {
      const data = await db.getCart({ user_id });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  removeFromCart: async (req, res) => {
    const db = req.app.get("db");
    const cart_item_id = parseInt(req.query.id);
    try {
      await db.removeCartItem({ cart_item_id });
      res.sendStatus(200); //send data for web visual of cart ?
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// },
// checkout: (req, res) => {
//   const { user } = req.session;
//   user.cart = [];
//   user.total = 0;

//   res.status(200).send(user);
// }
