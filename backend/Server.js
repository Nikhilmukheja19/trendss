import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/Mongodb.js';
import connectCloudinary from './config/Cloudinary.js';
import userRouter from './routes/UserRoute.js';
import productRouter from './routes/ProductRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// Middlewares
app.use(express.json())
app.use(cors())  

// Api endpoints
app.get('/', (req, res) => {
    res.send("API Working")
})
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(port, () => {
    console.log('Server Started on Port' + port);   
})