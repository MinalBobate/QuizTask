import express, { urlencoded } from "express"
import connectDB from './db.js'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
import authRoute from "./routes/authRoute.js"
import quizRoute from './routes/quizRoute.js'
//import adminRoute from "./routes/adminRoute.js"
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/auth', authRoute);
app.use('/api/quizzes',quizRoute );

app.get('/',(req,res)=>{res.send("hello")})

// Add user routes similarly


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
