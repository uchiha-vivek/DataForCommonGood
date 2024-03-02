const mongoose = require('mongoose')

const Schema =  mongoose.Schema;


const UserSchema = new Schema({
    
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true
    }
    
});


const User =  mongoose.model("User", UserSchema);
module.exports=User;
//