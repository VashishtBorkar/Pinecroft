import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    profilePicture: {type: String, default: '/default-profile-pic.jpg'}, 
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}));

export default User;