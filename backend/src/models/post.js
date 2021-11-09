module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Post",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Le titre ne peut pas être vide" },
          notEmpty: { msg: "Champs obligatoire" },
        },
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Champs requis" },
          notEmpty: { msg: "Champs obligatoire" },
        },
      },
      attachment: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      likes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true, // indique la modification par défaut du comportement de sequelize
      createdAt: "created",
      updatedAt: false,
    }
  );
};
