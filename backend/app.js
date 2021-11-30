const express = require("express");
const morgan = require("morgan");
const sequelize = require("./src/db/sequelize");
const cookieParser = require("cookie-parser");
const authcheckUser = require("./src/middleware/authcheckUser");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(morgan("dev")); // affiche les log des req entrants

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  // ressoures partagées depuis tte les origines
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    // indication des headers utilisés
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    // indication des méthodes autorisées pr les requête http
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//  sequelize.initDb();

// points de terminaisons:

//recuperer tous les posts
require("./src/routes/findAllPosts")(app);
//recupérer un post
require("./src/routes/findPostByPk")(app);
//créer un post
require("./src/routes/createPost")(app);
//modifier un post
require("./src/routes/updatePost")(app);
//supprimer un post
require("./src/routes/deletePost")(app);
//login user
require("./src/routes/login")(app);
//création user
require("./src/routes/createUser")(app);
//afficher un user
require("./src/routes/findUserByPk")(app);
//supprimer un user
require("./src/routes/deleteUser")(app);
//recupérer tous les users
require("./src/routes/findAllUser")(app);
//modifier un user
require("./src/routes/updateUser")(app);
//Logout
require("./src/routes/logout")(app);

//jwt
app.get("/jwtid", (req, res) => {
   const token = jwt.sign({ userId: user.id }, privateKey);
  // res.cookie("token", token, { httpOnly: true });
  res.json({ token });
});

//gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  )
);
