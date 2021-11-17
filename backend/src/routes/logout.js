const { User } = require("../db/sequelize");
const jwt = require("jsonwebtoken");

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
