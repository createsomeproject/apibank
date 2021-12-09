const express = require("express");
const Router = express.Router();
const UserDb = require("../models/UsersModel");
const bcrypt = require("bcryptjs");

// REGISTER A USER
Router.post("/register", async function (request, response) {
  const { firstname, lastname, email, password } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(request.body.password, salt);
    const NewUser = await new UserDb({
      firstname,
      lastname,
      email,
      password: hashpassword,
    });
    await NewUser.save();
    response.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Error",
    });
  }
});
// LOGIN A USER
Router.post("/login", async function (request, response){
    try {
        const FindName = await UserDb.findOne({firstname:request.body.firstname})
        if(!FindName){
            return response.status(401).json({
                message : 'Wrong name details'
            })
        }
        const PasswordCheck = await bcrypt.compare(request.body.password,FindName.password)
        if(!PasswordCheck){
            return response.status(401).json({
                message : 'Wrong Password Details'
            })
        }
        else{
          const {password, ...others} = FindName._doc
            return response.status(200).json(others)
        }
    } catch (error) {
       return response.status(500).json({
            message : 'Error'
        })
    }
})
module.exports = Router;