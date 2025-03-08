import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use()





app.listen(5000, () => {
    connectDB();
  console.log('Server is running on http://localhost:5000');
});
