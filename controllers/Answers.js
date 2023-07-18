import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer=async (req,res)=>{
    const{id:_id}=req.params;
    const {noofAnswers,answerBody,userAnswered,userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');

    }
    updateNoOfQuestions(_id,noofAnswers)
    try {
        const updatedQuestion= await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
        req.status(200).json(updatedQuestion)


        
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateNoOfQuestions=async(_id,noofAnswers)=>{
    try {
        await Questions.findByIdAndUpdate(_id,{$set:{'noofAnswers':noofAnswers}})
    } catch (error) {
        console.log(error)

    }
}
export const deleteAnswer=async(req,res) =>{
    const {id:_id}=req.params;
    const {answerId,noofAnswers}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');

    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('answer unavailable...');

    }
   updateNoOfQuestions(_id,noofAnswers)
   try {
    await Questions.updateOne(
        {_id},
        {$pull:{'answer':{_id:answerId}}}
    )
    res.status(200).json({message:"successfully deleted...."})
   } catch (error) {
    res.status(405).json(error)
   }

    
}