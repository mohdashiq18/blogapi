const express=require("express")
const {BlogModel} =require("./blogschema")
const BlogRoute=express.Router()


BlogRoute.get("/",async(req,res)=>{
    try{
       const data=await BlogModel.find()
       res.send(data)
    }
    catch(err){
        res.send(err)
    }
})




BlogRoute.delete("/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await BlogModel.findByIdAndDelete({"_id":id})
      res.send("Delete Success")
  }
  catch(err){
    res.send(err)
}
})



module.exports={
    BlogRoute
  }