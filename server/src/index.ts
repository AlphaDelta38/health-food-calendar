import express, { Request, Response } from 'express';
import openFoodFactsRouter from './routes/open-food-facts/index.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/open-food-facts', openFoodFactsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
