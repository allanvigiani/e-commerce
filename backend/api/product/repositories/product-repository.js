import conn from '../../../connection/connection.js';

class ProductRepository {

    constructor() {
        this.conn = conn;
    }

    async createProduct(body) {
        await this.conn.connect();

        const result = await this.conn.query(`
            INSERT INTO products (user_id, name, description, amount, price, available, assessment, url_image, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
        `, [body.user_id, body.name, body.description, body.amount, body.price, body.available, body.assessment, body.url_image, body.created_at]);

        return result.rows;
    }

    async getAllAvailableProducts() {
        await this.conn.connect();

        const result = await this.conn.query(`
            SELECT p.id, p.name, p.description, p.price, p.url_image FROM products p WHERE p.amount > 0 AND available = 't';
        `);

        return result.rows;
    }

    async getUserCart(userId) {
        await this.conn.connect();

        const result = await this.conn.query(`
            SELECT * FROM cart WHERE user_id = $1;
        `, [userId]);

        return result.rows;
    }

    async createUserCart(body) {
        await this.conn.connect();

        const result = await this.conn.query(`
            INSERT INTO cart (user_id, items)
                VALUES ($1, $2) RETURNING *;
        `, [body.user_id, body.items]);

        return result.rows;
    }

    async updateUserCart(userId, items) {
        await this.conn.connect();

        const result = await this.conn.query(`
            UPDATE cart SET items = $1 WHERE user_id = $2 RETURNING *;
        `, [items, userId]);

        return result.rows;
    }

}

export default ProductRepository;