const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    image:{type:String,required:true},
    userid:{type:String,required:true}

},{
    versionKey:false
})

const postModel=mongoose.model("posts",userSchema)

module.exports=postModel