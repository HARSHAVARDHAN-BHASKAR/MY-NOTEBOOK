import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";
import nodeRoute from './routes/nodeRoute.js';
dotenv.config();
connectDB();


const app=express()
const PORT=process.env.PORT || 5001;
const __dirname = path.resolve()
//cors method
if(process.env.NODE_ENV !== "production"){
app.use(
    cors({
    origin:"http://localhost:5173",
}));}

//middleware
app.use(express.json());
// app.use((req,res,next)=>{
//     console.log(`Req methis is ${req.method} & Req url is ${req.url}`);
// });


//ratelimiter
app.use(rateLimiter);



app.use("/api/notes",nodeRoute);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../FRONTEND/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../FRONTEND","dist","index.html"))
});
}

app.listen(PORT,()=>{
    console.log("Server started on port:", PORT )
})
