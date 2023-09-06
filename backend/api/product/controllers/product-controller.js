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

            const { name, amount, price, available } = body;

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

            await this.productRepository.createProduct(body);

            return {message: `Produto cadastrado com sucesso!`, status: 201};
        } catch (error) {
            return {message: error, status: 500};
        }
    }

    async get() {
        try {
            const products = await this.productRepository.getAllAvailableProducts();

            return {products: products, status: 200};
        } catch (error) {
            return {products: error, status: 500};
        }
    }

    async addItemtoCart(itemId, userData) {

        try {
            const userId = userData.payload.id;
            if (!userId) {
                const errorMessage = `Problema ao identificar ID no token.`;
                return {message: errorMessage, status: 500};
            }

            if (!itemId) {
                const errorMessage = `Nenhum item foi passado como parâmetro.`;
                return {message: errorMessage, status: 500};
            }

            const cartUserExist = await this.productRepository.getUserCart(userId);
            
            if (cartUserExist.length > 0) {

                const items = JSON.parse(cartUserExist[0].items);
                items.push(parseInt(itemId));

                const bodyItems = JSON.stringify(items);

                await this.productRepository.updateUserCart(userId, bodyItems);

                return {message: `Item adicionado ao carrinho!`, status: 200};
            }

            const items = [parseInt(itemId)];

            const cartBody = {
                user_id: userId,
                items: JSON.stringify(items)
            }

            await this.productRepository.createUserCart(cartBody);

            return {message: `Item adicionado ao carrinho!`, status: 200};

        } catch (error) {
            return {message: error, status: 500};
        }
    }

}

export default ProductController;