const express=require('express');
const router = express.Router();
const MensRanking=require('../models/mens.js')

router.post('/mens', async(req,res)=>{
    try {
        const document=new MensRanking(req.body);
        await document.save();
        res.status(201).json({message:"Data added successfully..."})
    } catch (error) {
        res.status(500).json({message:"Internal Server error..."})
        
    }
})

 //handling the get request---------------------

router.get('/mens', async(req,res)=>{
    try {
        const document=await MensRanking.find().select({name:1, ranking:1, _id:0})
        document.forEach((item)=>{
            console.log(item.name,"->", item.ranking)
        })
        res.status(200).send(document);

        
    } catch (error) {
        res.status(500).json({message:"Internal Server error..."})
        
    }
 })

router.get('/mens/:id', async(req,res)=>{
   try {
    const mensId=req.params.id;
    const document=await MensRanking.find({_id:mensId}).select({name:1, ranking:1, _id:0});
    res.status(200).send(document[0].name);
    
   } catch (error) {
    res.status(500).json({message:"Internal Server error..."})
    
   }
 })

router.delete('/mens/:id', async(req,res)=>{
    try {
    const mensId=req.params.id;
    const document=await MensRanking.deleteOne({_id:mensId});
    res.status(200).json({message:"Data deleted successfully..."})
        
    } catch (error) {
        res.status(500).json({message:"Internal Server error..."})
        
    }
 })

router.patch('/mens/:id', async (req, res) => {
    try {
        const mensId = req.params.id;
        const newName=req.body.name;
        const updatedDocument = await MensRanking.findOneAndUpdate(
            { _id: mensId },
            { $set: { name: newName } },
            { new: true } // This option returns the updated document
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).send(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error..." });
    }
});

module.exports=router;

