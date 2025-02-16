import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './Db/connection.js';
import pollRoutes from './route/Poll.route.js';


dotenv.config();


const app = express();


app.use(cors());
app.use(bodyParser.json());


connectDB();



app.use('/api/v1/polls', pollRoutes);
app.get('/',async(req,res)=>{
    res.status(200).json({message:'Server is Live'})
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
