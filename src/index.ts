import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import {  connectToDatabase } from './config/database';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

 connectToDatabase().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});
