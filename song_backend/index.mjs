import express from "express";
import mongoose from 'mongoose';
import router from './routes/songs.js';


import cors from 'cors';

const app = express();
const PORT = 5000;
const uri = "mongodb";

app.use(express.json());
app.use(cors({ origin: `http://localhost:3001`, credentials: true }));
app.use('/api',router);

async function connect(){
  try {
    await mongoose.connect(uri)
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}
connect();

app.listen(PORT,()=>console.log(`Server is running on port: http://localhost:${PORT}`))
