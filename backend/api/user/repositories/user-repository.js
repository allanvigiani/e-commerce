import conn from '../../../connection/connection.js';

class UserRepository {

    constructor() {
        this.conn = conn;
    }

    async createUser(user) {

        const { name, email, password, created_at } = user;

        await this.conn.connect();
        const result = await this.conn.query(`
            INSERT INTO public.users
                (name, email, hash_password, created_at)
                VALUES ($1, $2, $3, $4) RETURNING id;
        `, [`${name}`, `${email}`, password, created_at]);

        return result.rows[0];
    }

}

export default UserRepository;