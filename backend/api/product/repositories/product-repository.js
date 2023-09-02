import pgp from 'pg-promise';

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

}

export default ProductRepository;