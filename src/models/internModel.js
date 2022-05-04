const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
    },
   
    mobile:{
        type: String,
        required:true,
        maxlength:10,
        unique:true
    },
    collegeId: {
        type: ObjectId,         
        ref: 'college',
        required:true 
    },
  
    isDeleted: {
        type: Boolean,
        default: false
      
    }
    
}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)