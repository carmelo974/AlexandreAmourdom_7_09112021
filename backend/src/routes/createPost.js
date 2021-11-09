const { Post } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/post", auth, (req, res) => {
    Post.create(req.body)
      .then((post) => {
        const message = `Le post ${req.body.title} a bien été crée.`;
        res.json({ message, data: post });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le post n'a pas pu être récupéré. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};

////******************ajouter image mime type */