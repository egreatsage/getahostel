const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password: String,
});

const UserModal = mongoose.model('User', UserSchema);
module.exports = UserModal;