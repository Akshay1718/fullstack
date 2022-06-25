import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
 import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
// import roomsRoute from "./routes/rooms.js";
dotenv.config();

const cnct =async ()=> {

    try{
        await mongoose.connect(process.env.MONGO);
        console.log("mongo db yo");
    }catch(error) {
       throw error
    }
};
app.use(express.json())
app.use(cookieParser())

 app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  
app.listen(8000,()=>{
    cnct();
    console.log("hisd")
})