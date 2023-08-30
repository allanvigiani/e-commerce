import express from 'express';
import authenticateToken from './middleware/auth.js';
// import loginController from '../controllers/login-controller.js';

const router = express.Router();

router.post('/login', authenticateToken, async (req, res) => {
    res.status(200).json({ message: `Usuário logou!` });
  });

export default router;