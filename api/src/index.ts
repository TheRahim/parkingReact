import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import parkingRouter from './routes/parking'


const app = express();
const PORT = process.env.PORT || 3000;

const parkingRates = JSON.parse(import.meta.env.VITE_PARKING_RATES || '[]');
const parkingRates180m = JSON.parse(import.meta.env.VITE_PARKING_RATES_180M || '[]');

// Database
const MONGO_URI= import.meta.env.VITE_MONGO_URL;

//CORS all routes
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/parking', parkingRouter);


mongoose.connect('mongodb://localhost:27017/parking', {
})
  .then(() => {
    console.log('MongoDB connected successfully');


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  });
export const viteNodeApp = app;


