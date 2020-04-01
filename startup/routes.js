const bodyParser = require("body-parser");
const cors = require("cors");

//import routes
const testRoutes = require("../routes/auth");

/**
 * will handle errors globally passed as last route
 */
const error = require("../middlewares/error");

module.exports = app => {
  //middlewares

  app.use(bodyParser.json());
  app.use(cors());

  //routes middleware
  app.use("/api", testRoutes);

  app.use(error);
};
