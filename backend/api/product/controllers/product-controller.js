import dotenv from 'dotenv';

import ProductRepository from "../repositories/product-repository.js";

dotenv.config();

const productRepository = new ProductRepository();

class ProductController {

    constructor() {
        this.productRepository = productRepository;
    }

    async create(body, userData) {
        try {

            const { name, description, amount, price, available, assessment } = body;

            const userId = userData.payload.id;
            if (!userId) {
                const errorMessage = `Problema ao identificar ID no token.`;
                return {message: errorMessage, status: 500};
            }

            const requiredFields = {
                name,
                amount,
                price,
                available
            }

            for (const field of Object.keys(requiredFields)) {
                if (!requiredFields[field]) {
                    const errorMessage = `O campo ${field} é obrigatório e não foi informado!`;
                    return {message: errorMessage, status: 400};
                }
            }

            body.created_at = new Date();
            body.user_id = userId;

            const result = await this.productRepository.createProduct(body);

            return {message: `Produto cadastrado com sucesso!`, status: 201};
        } catch (error) {
            return {message: error, status: 500};
        }
    }

}

export default ProductController;