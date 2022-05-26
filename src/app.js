const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");
const jwt = require("jsonwebtoken");
const todoRouter = require("./routes/todos");
const authRouter = require("./routes/auth");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/todos", todoRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


module.exports = app; 