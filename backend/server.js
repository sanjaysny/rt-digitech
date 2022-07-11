const express = require("express");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json({ limit: '1.5mb' }));
app.use(bodyParser.urlencoded({ limit: '1.5mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to RT Digitech crud application." });
// });

var productRout = require("./app/routes/product.routes");
var empRout = require("./app/routes/employee.routes");
app.use("/api/product", productRout);
app.use("/api/employee", empRout);
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
