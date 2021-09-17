import express from "express";
import cors from "cors";
const bodyParser = require("body-parser");
const server = express();
const port = 3000;

//enable cors
server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//routes
server.use("/api", require("./routes/api/auth"));
server.use("/api", require("./routes/api/profile"));
server.use("/api", require("./routes/api/products"));

server.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
