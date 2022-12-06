const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserDB',()=>{
    console.log("Connection Created ...");
})

let user = {
    "userId":{
        required:[true,'Required Field'],
        type:String,
        unique:true
    },
    "firstName" : {
        required:[true,'Required Field'],
        type:String
    },
    "lastName" : {
        required:[true,'Required Field'],
        type:String
    },
    "email":{
        required:[true,'Required Field'],
        type:String,
        unique:true
    },
    "phoneNumber":{
        required:[true,'Required Field'],
        type:String
    },
    "profileImg":String
}

let userSchema = mongoose.Schema(user,{collection:'User',timestamps:true});
let userModel = mongoose.model('User',userSchema);

module.exports = userModel;