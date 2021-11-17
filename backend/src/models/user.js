const { User } = require("../db/sequelize");

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
      bio: {
        allowNull: true,
        type: DataTypes.STRING
      },
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  })
  
  User.associate = models => {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    })
  }
  
};


/*///////////////////ajouter restriction regex rajouter bio//////////////////////////*/