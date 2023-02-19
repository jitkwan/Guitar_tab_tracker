const express = require("express");
const bodyParser = require("body-parser"); // help to process json data
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models"); //export sequelize obj
const config = require("./config/config");

const app = express(); // build express server
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require('./passport')
require("./routes")(app); // require route and pass the app (bcause route return func then pass app)

sequelize
  .sync({force: false}) // .sync = to connect sequelize
  .then(() => {
    // finished sync and then start server
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  });
