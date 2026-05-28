const express = require("express");
const postRouters = express.Router();
const Postcontroller = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");
postRouters.post(
  "/",
  upload.single("image"),
  identifyUser,
  Postcontroller.createPostcontroller,
);
postRouters.get("/", identifyUser, Postcontroller.getpostController);
postRouters.get(
  "/details/:postId",
  identifyUser,
  Postcontroller.getpostDetailsController,
);
module.exports = postRouters;
