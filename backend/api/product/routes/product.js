import express from 'express';
import authenticateToken from '../../middleware/auth.js';
import ProductController from '../controllers/product-controller.js';

const productController = new ProductController();

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const result = await productController.create(req.body, req.user);
    res.status(result.status).json({ message: result.message });
});

// Para visualizar os produtos do ecommerce o usuário não precisa estar autenticado
router.get('/', async (req, res) => {
    const result = await productController.get();
    res.status(result.status).json({ products: result.products });
});

router.post('/cart/:item', authenticateToken, async (req, res) => {
    const result = await productController.addItemtoCart(req.params.item, req.user);
    res.status(result.status).json({ message: result.message });
});

export default router;