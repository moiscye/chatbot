const express = require("express");
const app = express();
//will handle the async error globally
require("express-async-errors");

require("./startup/routes")(app);
require("./startup/db")();

//Assigning port number
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets
  // like main.js or main.css
  app.use(express.static("client/build"));

  //Express will serve up the index.html
  //if it does not recognize the route like /dashboard and so on
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//To be use for testing purpuses
module.exports = server;
