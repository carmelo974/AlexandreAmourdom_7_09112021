const { Post } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/post", auth, (req, res) => {
    Post.findAll()
      .then((post) => {
        const message = "La liste des posts a bien été récupérée.";
        res.json({ message, data: post });
      })
      .catch((error) => {
        const message =
          "La liste des posts n'a pas pu être récupérée. Réessayez dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
};
