const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    ProductName:{type:String,required:true},
    Price:{type:String,required:true},
    MedName:{type:String,required:true},
    MedDega:{type:String,required:true},
    HumDenge:{type:String,required:true},
    Hamaracommision:{type:String,required:true},
    OrderForm:{type:String},
    RefundForm:{type:String},
    DealType:{type:String,required:true},
    TotalShared:{type:Number,required:true},
    LastShared:{type:String,required:true},
    image:{type:String,required:true},

},{
    versionKey:false
})

const postModel=mongoose.model("posts",userSchema)

module.exports=postModel