const { Post } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/post/:id", auth, (req, res) => {
    Post.findByPk(req.params.id)
      .then((post) => {
        if (post === null) {
          const message =
            "Le post demandé n'existe pas. Réessayez avec un autre identifiant. ";
          return res.status(404).json({ message });
        }
        const message = "Un post a bien été trouvé.";
        res.json({ message, data: post });
      })
      .catch((error) => {
        const message =
          "Le post n'a pas pu être récupéré. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
