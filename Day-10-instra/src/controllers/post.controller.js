const { request } = require("../app");
const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources.js");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostcontroller(req, res) {
  const uploadedFile = await imageKit.files.upload({
    file: await toFile(req.file.buffer, req.file.originalname),
    fileName: "Test",
    folder: "insta-clone",
  });
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: uploadedFile.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "post created",
    post,
  });
}

async function getpostController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });
  res.status(200).json({
    message: "post fetch sussessfully",
    posts,
  });
}

async function getpostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  if (!post) {
    res.status(404).json({
      message: "post not found",
    });
  }
  const isvalidUser = post.user.toString() === userId;
  if (!isvalidUser) {
    res.status(403).json({
      message: " Forbidden content",
    });
  }
  res.status(200).json({
    message: "post fetch sussessfully",
    post,
  });
}
module.exports = {
  createPostcontroller,
  getpostController,
  getpostDetailsController,
};
