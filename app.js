const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const ConnectionDb = require("./connection/Database");
const AuthRoute = require('./routes/AuthRoute')
const UsersRoute = require('./routes/UsersRoute')
const PostRoute = require('./routes/PostRoute')

app.use(morgan("tiny"));
app.use(express.json())
app.use('/auth',AuthRoute)
app.use('/auth',UsersRoute)
app.use('/post',PostRoute)



const StartConnection = async () => {
  try {
    await ConnectionDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`App runbning on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

StartConnection()
