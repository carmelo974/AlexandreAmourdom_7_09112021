const { Post } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/post/:id",auth, (req, res) => {
    const id = req.params.id;
    Post.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Post.findByPk(id).then((post) => { //return permet de gérer l'erreur 500 du dernier bloc catch pr éviter de dupliquer 2 blocs catch
          if (post === null) {
            const message =
              "Le post demandé n'existe pas. Réessayez avec un autre identifiant. ";
            return res.status(404).json({ message });
          }
          const message = `Le post ${post.title} a bien été modifié.`;
          res.json({ message, data: post });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le post n'a pas pu être modifié. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
