const express = require("express");
const Router = express.Router();
const PostDb = require("../models/PostModel");

// GET A POST
Router.get('/:id',async function(request,response){
        try {
            const AllPost = await PostDb.findById(request.params.id)
            response.status(200).json(AllPost)
        } catch (error) {
            console.log(error)
            response.status(500).json({
                message : 'Error'
            })
        }
})
// GET ALL POSTS
Router.get('', async function(request,response){
    const user = request.query.user
    try {
        let Posts
        if(user){
           Posts =  await PostDb.find({username : user})
        }
        else{
           Posts =  await PostDb.find()
        }
        response.status(200).json(Posts)
        console.log(user)
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message : 'Error'
        })
    }
})
// CREATE A POST
Router.post("/", async function (request, response) {
  try {
    const newPost = await new PostDb({
      username: request.body.username,
      title: request.body.title,
      description: request.body.description,
      body: request.body.body,
    });
    await newPost.save();
    response.status(200).json({
      message: "Post created successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: "Error",
    });
  }
});
// UPDATE A POST
Router.put("/update/:id", async function (request, response) {
  try {
    const Post = await PostDb.findById(request.params.id);
    if (Post.username === request.body.username) {
      try {
        await PostDb.findByIdAndUpdate(request.params.id, {
          $set: request.body,
          new: true,
        });
      } catch (error) {
        console.log(error);
        response.status(500).json({
          message: "Error",
        });
      }
      response.status(200).json({
        message: "You have successfully updated your account ",
      });
    } else {
      response.status(401).json({
        message: "You can only update your post",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(401).json({
      message: "Id does not match with the username",
    });
  }
});
// DELETE A POST
Router.delete("/delete/:id", async function (request, response) {
  try {
    if (request.body.UserId === request.params.id) {
      try {
        await PostDb.findByIdAndDelete(request.params.id);
      } catch (error) {
        console.log(error);
        response.status(500).json({
          message: "Error",
        });
      }
      response.status(200).json({
        message: "You have successfully deleted your post ",
      });
    } else {
      response.status(401).json({
        message: "You can only delete your post",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Error",
    });
  }
});

module.exports = Router;
