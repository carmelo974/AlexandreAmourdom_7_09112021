const { User } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/user/:id", auth, (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return User.findByPk(id).then((user) => {
          //return permet de gérer l'erreur 500 du dernier bloc catch pr éviter de dupliquer 2 blocs catch
          if (user === null) {
            const message =
              "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant. ";
            return res.status(404).json({ message });
          }
          const message = `L'utilisateur ${user.username} a bien été modifié.`;
          res.json({ message, data: user });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
