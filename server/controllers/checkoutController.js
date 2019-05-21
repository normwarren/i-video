const stripe = require("stripe")("sk_test_1LivSkQRB1cUQeHhFqvl7cfD00ZtRxo3qZ");
module.exports = {
  charge: async (req, res) => {
    // const { user_id, product_id, product_price } = req.body;
    // Number(product_price);
    //const db = req.app.get("db");
    try {
      let { status } = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body.tokenId
      });
      res.status(200).send(status);
    } catch (err) {
      res.status(500).end();
    }
  }
};
