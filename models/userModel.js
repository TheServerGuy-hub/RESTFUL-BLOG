const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,

});

const userModel= mongoose.model("User", userSchema);

module.exports = {
    userModels,
}