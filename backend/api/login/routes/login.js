import express from 'express';
import authenticateToken from '../../middleware/auth.js';
import LoginController from '../controllers/login-controller.js';

const loginController = new LoginController();

const router = express.Router();

router.post('/login', async (req, res) => {
    const result = await loginController.login(req.body);
    res.status(result.status).json({ message: result.message });
});

router.post('/logout', authenticateToken, async (req, res) => {
    console.log(req.user);
    const result = await loginController.logout(req.user);
    res.status(result.status).json({ message: result.message });
});

// TODO -> Rota de recuperação de senha via email

export default router;