// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user");
// const cookieParser = require("cookie-parser");
// const { application } = require("express");
// const cors = require("cors");

// application.use(cookieParser());
// application.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, privateKey, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json("no token");
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("no token");
//   }
// };
