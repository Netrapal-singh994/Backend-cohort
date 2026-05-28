const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "userName is required"],
    unique: [true, "userNmae account already exists"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "userEmail  already exists"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/otuontd4m/user%20image.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
