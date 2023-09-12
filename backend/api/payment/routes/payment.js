import express from 'express';
import authenticateToken from '../../middleware/auth.js';
import PaymentController from '../controllers/payment-controller.js';

const paymentController = new PaymentController();

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const result = await productController.create(req.body, req.user);
    res.status(result.status).json({ message: result.message });
});

export default router;