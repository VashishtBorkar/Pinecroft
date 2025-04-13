import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import e from 'express';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv";

dotenv.config();




const secret = "secret123";
const app = express();


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));
  

const db = mongoose.connection;
db.on('error', console.log);

app.get('/', (req, res) => {
    res.send("backend loaded");
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);



app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


