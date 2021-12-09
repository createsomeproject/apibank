const mongoose = require('mongoose')
const Post = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    title : {
       type :  String,
       required : true
    },
    description : {
        type :  String,
        required : true
    },
    body : {
        type :  String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})
const PostDb = mongoose.model('postdb', Post)
module.exports = PostDb