const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const privateKey = require("../auth/private_key");
const { ValidationError, UniqueConstraintError } = require("sequelize");

// validation erreur ne marche pas !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
module.exports = (app) => {
  app.post("/api/signup", (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, function (_err, hash) {
          User.create({
            username: req.body.username,
            password: hash,
            isAdmin: 0,
          })
            .then(() => {
              const message = `L'utilisateur a été crée avec succès`;
              return res.json({ message });
            })
            .catch((error) => {
              if (error instanceof ValidationError) {
                return res
                  .status(400)
                  .json({ message: error.message, data: error });
              }

              if (error instanceof UniqueConstraintError) {
                return res
                  .status(400)
                  .json({
                    message: "Cette utilisateur existe déjaaaaa",
                    data: error,
                  });
              }
              const message = `L'utilisateur n'a pas pu être crée. Réessayer dans quelques instants`;
              return res.status(500).json({ message, data: error });
            });
        });
      }
    });
  });
};
