import express from 'express'

const app = express();
const PORT_NO=6000;

app.get("/",(req,res)=>{
    res.end("Server is up & running on port no :6000");
})

app.listen(PORT_NO,()=>{
    console.log("Server is up & running on port no. :",PORT_NO);
    
})