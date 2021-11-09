const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

//settings
app.set("port", process.env.PORT || 3015);
app.set("json spaces", 2);

//middlewares
app.use(morgan("dev"));
app.use(cors());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true })
);
app.use(express.json());

// routes
app.use(require("./routes/index"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Aplicación escuchando en http://localhost:${app.get("port")}`);
});
