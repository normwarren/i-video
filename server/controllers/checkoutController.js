require("dotenv").config();
const { STRIPE_SECRET } = process.env;
const stripe = require("stripe")(STRIPE_SECRET);
//
module.exports = {
  charge: async (req, res) => {
    const { amount, tokenId } = req.body;
    const adjAmount = (+amount * 100).toFixed(0);
    try {
      let { status } = await stripe.charges.create({
        amount: adjAmount,
        currency: "usd",
        description: "An example charge",
        source: tokenId
      });
      res.status(200).send(status);
    } catch (err) {
      res.status(500).end();
    }
  }
};
