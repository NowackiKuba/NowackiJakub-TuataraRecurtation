import express from 'express';
import dotenv from 'dotenv';
import loanRouter from './controllers/loanController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/loans', loanRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
