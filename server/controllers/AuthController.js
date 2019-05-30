const bcrypt = require("bcryptjs");

module.exports = {
  getUsers: (req, res) => {
    const db = req.app.get("db");
    db.getAllUsers().then(data => {
      res.status(200).send(data);
    });
  },
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, firstname, lastname, username, password } = req.body;
    const { session } = req;
    let emailTaken = await db.checkEmail({ email });
    emailTaken = +emailTaken[0].count;
    if (emailTaken !== 0) {
      return res.sendStatus(409);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user_id = await db.registerUser({
      email,
      firstname,
      lastname,
      username,
      hash
    });
    session.user = {
      username,
      user_id
    };
    res.status(200).send(session.user.user_id[0]);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { session } = req;
    const { loginUsername: username } = req.body;
    try {
      let user = await db.login({ username });
      session.user = user[0];
      const authenticated = bcrypt.compareSync(
        req.body.loginPassword,
        user[0].password
      );
      if (authenticated) {
        res.status(200).send({ authenticated, user_id: user[0].user_id });
      } else {
        throw new Error(401);
      }
    } catch (err) {
      res.sendStatus(401);
    }
  },
  //LOGIN FIRST TO TEST
  getDetails: async (req, res) => {
    const db = req.app.get("db");
    const { session } = req;

    try {
      const id = req.query.id;
      const data = await db.getUserDetails({ id });
      res.status(200).send(data[0]);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: (req, res) => {
    const { session } = req;
    //res.status(200).send("i am alive");
    res.status(200).send(session.user);
  },
  updateDetails: async (req, res) => {
    const db = req.app.get("db");
    const { session } = req;
    const id = req.query.id;
    const { firstname: first_name, lastname: last_name, email } = req.body;
    try {
      const name = await db.updateUserInfo({
        id,
        first_name,
        last_name,
        email
      });
      session.user = {
        first_name: name,
        user_id: id
      };
      res.status(200).send(session.user);
    } catch (err) {
      console.log("error", err);
      res.sendStatus(500);
    }
  }
};
