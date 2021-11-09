const { Sequelize, DataTypes } = require("sequelize");
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const post = require("./mock-post");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = new Sequelize("groupomania", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établi")
  )
  .catch((error) =>
    console.error(`impossible de se connecter à la base de données ${error}`)
  );

const Post = PostModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    post.map((post) => {
      Post.create({
        title: post.title,
        content: post.content,
        attachment: post.attachment,
        likes: post.likes,
      }).then((post) => console.log(post.toJSON()));
    });

    bcrypt
      .hash("carmelo", 10)
      .then((hash) =>
        User.create({
          username: "carmelo",
          password: hash,
          bio: " bonjour",
          isAdmin: 1,
        })
      )
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Post,
  User,
};
