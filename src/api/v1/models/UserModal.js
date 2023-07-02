const mongoose = require('mongoose');

//Create the shcema of our modal
const UserSchema = new mongoose.Schema({
    name : {type: String, required: true, minlength: [5, "Name must be 5 char long "], maxlength: [150,"Name mustn't 150 char long"],lowercase:true},

    email : {type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [350,"Email mustn't 350 char long"], unique:true ,trim:true,lowercase:true},

    password : {type: String, required: true, minlength: [8, "Password must be 8 char long "], maxlength: [450,"Password mustn't 450 char long"]},

    uploadImg : [{
        title : String,
        description:String,
        img : {
            public_id:String,
            url : String,
        },
        views: {type:Number,required:true,default:0}
    }
        
    ],

    // picturepic : {type: String, required: true, default:'' },

    role : {type: String, required: true, default:'user'},

    // status : {type: Boolean, required: true, default:false},

},{timestamps :true})
 

//Modal to which collection form we save the data
const UserModal = mongoose.model('User', UserSchema)

module.exports = UserModal