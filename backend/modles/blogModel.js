const mongoose=require('mongoose')
 
const Schema=mongoose.Schema

const blogSchema=new Schema({
    title:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required: true
    },
    // user_id:{
    //     type: String,
    //     required:true
    // }
    Image: {
        // public_id: {
        //   type: String,
        //   required: true,
        // },
        // url: {
        //   type: String,
        //   required: true,
        // },
        type: String,
          required: true,
    }
     
      
    
}, { timestamps: true })

module.exports=mongoose.model('Blog',blogSchema)