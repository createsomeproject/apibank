const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const UserDb = require("../models/UsersModel");
const PostDb = require("../models/PostModel");

// GET A USER
Router.get("/:id", async function (request, response) {
  try {
    const User = await UserDb.findById(request.params.id);
    const { password, ...others } = User._doc;
    response.status(200).json(others);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Error",
    });
  }
});

// UPDATE A USER
Router.put("/update/:id", async function (request, response) {
  if (request.body.UserId === request.params.id) {
    if (request.body.password) {
      const salt = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password, salt);
    }
    try {
      await UserDb.findByIdAndUpdate(request.params.id, {
        $set: request.body,
        new: true,
      });
      response.status(200).json({
        message: "You have successfully updated your account",
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Error",
      });
    }
  } else {
    response.status(401).json({
      message: "You can only update your account",
    });
  }
});
// Delete A USER
Router.delete("/delete/:id", async function (request, response) {
  if (request.body.UserId === request.params.id) {
    try {
      const user = UserDb.findById(request.params.id);
      try {
        await PostDb.deleteMany({ username: user.username });
        await UserDb.findByIdAndDelete(request.params.id);
        response.status(200).json({
          message: "You have successfully deleted your account",
        });
      } catch (error) {
        console.log(error);
        response.status(500).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.log(error);
      response.status(404).json({
        message: "No user Found",
      });
    }
  } else {
    response.status(401).json({
      message: "You can only delete your account",
    });
  }
});

module.exports = Router;
