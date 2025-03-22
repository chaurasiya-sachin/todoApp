import express from 'express'
import { db_connection } from './db/db_connection.js';
import userRoute from "./route/user.route.js"
import cookieParser from 'cookie-parser';


// database connection 
db_connection()

// app intilizations
const app = express();

// middleware
app.use(express.json())
app.use(cookieParser())

// route middleware
app.use("/api/v1/user",userRoute)


// port listining
app.listen(900,()=>{
    console.log(`Server is up & running on port no. :`);
    
})