// const { Post } = require("../db/sequelize");

// const post = require("../db/mock-post");

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
      comments: {
        allowNull: true,
        type: [{}],
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
  // post.associate = function (models) {
  //   post.belongsTo(models.User, { foreignKey: "userId" });
  // };
};

// Post.associate = (models) => {
//   Post.belongsTo(models.User, {
//     foreignKey: {
//       foreignKey: 'creatorId',
//       allowNull: false,
//     },
//   });
//   return Post;
// };
