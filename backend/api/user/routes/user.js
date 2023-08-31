import express from 'express';
import authenticateToken from '../../middleware/auth.js';
import UserController from '../controllers/user-controller.js';

const userController = new UserController();

const router = express.Router();

router.post('/', async (req, res) => {
    const result = await userController.register(req.body);
    res.status(result.status).json({ message: result.message });

});

router.get('/:userId', authenticateToken, async (req, res) => {
    res.status(200).json({ message: `Usuário logou!` });
});

export default router;