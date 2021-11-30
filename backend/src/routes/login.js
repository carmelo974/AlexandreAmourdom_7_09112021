const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

const maxAge = 24;

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    console.log("req.body" + req.body);
    User.findOne({
      where: { username: req.body.username },
    })
      .then((user) => {
        if (!user) {
          const message = `L'utilisateur demandé n'existe pas.`;
          return res.status(404).json({ message });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect`;
              return res.status(401).json({ message, data: user });
            }

            //JWT
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });

            const message = `L'utilisateur a été connecté avec succès`;
            //  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
            res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        console.log(error);
        const message = `L'utilisateur n'a pas pu être connecté`;
        return res.json({ message, data: error });
      });
  });
};
