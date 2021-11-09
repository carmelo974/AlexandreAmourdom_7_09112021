module.exports.loginErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.message.includes("username")) errors.username = "username inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};
