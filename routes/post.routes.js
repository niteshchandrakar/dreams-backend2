const express=require("express")
const auth=require('../middleware/auth.middleware')
const postModel=require("../model/post.model")
const postRouter=express.Router()
// postRouter.use(auth)
postRouter.get("/",async(req,res)=>{
    try{

    const post= await postModel.find()
    res.status(200).send({posts:post})
  }catch(error){
        res.status(400).send({msg:error})
    }
})
postRouter.post("/add",async(req,res)=>{
    try{
const {ProductName,Price,MedName,MedDega,HumDenge,OrderForm,RefundForm,DealType,TotalShared,LastShared,Hamaracommision,image,OrderLink,RefundTime}=req.body

const post= await new postModel({ProductName,Price,MedName,MedDega,HumDenge,OrderForm,RefundForm,DealType,TotalShared,LastShared,Hamaracommision,image,OrderLink,RefundTime})
post.save()
res.status(200).send({msg:"Deal added"})


    }catch(error){
        res.status(400).send({msg:error})
    }
})
// Search by ProductName
postRouter.get('/search/:keyword', async (req, res) => {
    try {
      const { keyword } = req.params;
      if (!keyword) {
        return res.status(400).send({ msg: 'Keyword is required' });
      }
  
      const results = await postModel.find({ ProductName: new RegExp(keyword, 'i') });
      res.status(200).send(results);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
});

postRouter.patch("/update/:postid",async(req,res)=>{
const {postid}=req.params
    try{
        const post=await postModel.findOne({_id:postid})
       const payload=req.body
        if(post.userid==req.body.userid){
        await postModel.findByIdAndUpdate({_id:postid},payload)
        res.status(200).send({msg:"Deal Updated"})
        }else{
            res.status(400).send({msg:"Not Authorized user"})
        }

    }catch(error){
        res.status(400).send({msg:error})
    }
})
postRouter.get("/:postid", async (req, res) => {
    const { postid } = req.params;
    try {
        const post = await postModel.findById(postid);
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send({ msg: "Post not found" });
        }
    } catch (error) {
        res.status(400).send({ msg: error });
    }
});

postRouter.delete("/delete/:postid",async(req,res)=>{
const {postid}=req.params
    try{
        const post=await postModel.findOne({_id:postid})
       
        if(post.userid==req.body.userid){
        await postModel.findByIdAndDelete({_id:postid})
        res.status(200).send({msg:"Deal Deleted"})
        }else{
            res.status(400).send({msg:"Not Authorized user"})
        }

    }catch(error){
        res.status(400).send({msg:error})
    }
})


module.exports=postRouter