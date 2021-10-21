const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome home" });
});

app.get("/api/user/actors", (req, res) => {
  res.json({ message: "Hello Actors" });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// connect to database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database !");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}.`);
});
