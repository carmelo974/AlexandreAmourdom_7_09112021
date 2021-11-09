module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        msg: "Cette utilisateur existe déja",
      },
      validate: {
        notEmpty: { msg: "champs obligatoire." },
        notNull: { msg: "champs requis." },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "champs obligatoire." },
        notNull: { msg: "champs requis." },
      },
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  });
};
/*///////////////////ajouter restriction regex rajouter bio//////////////////////////*/