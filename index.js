
import express from 'express'
import mongoose from 'mongoose'
import cors  from 'cors'
import userRouters from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import dotenv from 'dotenv'

dotenv.config();
const app=express();
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors());


app.get('/',(req,res)=>{
    res.send("this is a stack overflow clone API")

})
app.use('/user',userRouters)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)

const PORT=process.env.PORT||5000
const DATABASE_URL =process.env.CONNECTION_URL
mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
    .catch((err)=>console.log(err.message)) 
