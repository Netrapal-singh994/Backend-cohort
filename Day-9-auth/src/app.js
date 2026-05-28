const express = require("express");
const authRouter = require("./routes/auth.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
module.exports = app;
