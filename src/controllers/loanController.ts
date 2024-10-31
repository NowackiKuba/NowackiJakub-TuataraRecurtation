import express, { Request, Response } from 'express';
import loanService from '../services/loanService';

const router = express.Router();

router.post('/calculate', async (req: Request, res: Response) => {
  try {
    const result = await loanService.calculateLoan(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

export default router;
