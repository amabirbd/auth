const { authJwt } = require("../middlewares");
const { userBoard } = require("../controllers/user.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/movies", [authJwt.verifyToken], userBoard);
};
