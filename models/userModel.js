const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,

});

const userModel= mongoose.model("User", userSchema);

module.exports = {
    userModel,
}