module.exports = (app) => {
  app.get("/api/logout", (_req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  });
};
