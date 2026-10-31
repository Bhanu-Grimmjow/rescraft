import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


const app = express();
const PORT = process.env.PORT|| 3000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

 await connectDB();
app.use(express.json())
app.use(cors({ origin: allowedOrigins }))

  
app.get('/',(req,res)=>res.send("server is live..."))
app.use('/api/users',userRouter)
app.use('/api/resume',resumeRouter)
app.use('/api/ai',aiRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
