const { Post } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/post/:id", auth, (req, res) => {
    Post.findByPk(req.params.id)
      .then((post) => {
        if (post === null) {
          const message =
            "Le post demandé n'existe pas. Réessayez avec un autre identifiant. ";
          return res.status(404).json({ message });
        }
        const postDeleted = post;
        return Post.destroy({
          where: { id: post.id },
        }).then((_) => {
          const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`;
          res.json({ message, data: postDeleted });
        });
      })
      .catch((error) => {
        const message =
          "Le post n'a pas pu être supprimé. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
