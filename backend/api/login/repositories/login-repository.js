import conn from '../../../connection/connection.js';

class LoginRepository {

    constructor() {
        this.conn = conn;
    }

    async getUserByEmail(userEmail) {

        await this.conn.connect();
        const result = await this.conn.query(`
            SELECT u.id, u.name, u.email, u.hash_password FROM users u 
                WHERE u.email = $1 
        `, [userEmail]);

        return result.rows[0];
    }

    async getUserSession(userId) {
        await this.conn.connect();
        const result = await this.conn.query(`
            SELECT us.id, us.start_login, us.end_login, us.token FROM users_sessions us 
                WHERE us.user_id = $1 AND us.end_login IS NULL
        `, [userId]);

        return result.rows[0];
    }

    async deleteUserSession(sessionId) {
        await this.conn.connect();
        const result = await this.conn.query(`
            UPDATE users_sessions us SET end_login = NOW() WHERE us.id = $1; 
        `, [sessionId]);

        return result.rows;
    }

    async deleteUserSessionByUserId(userId) {
        await this.conn.connect();
        const result = await this.conn.query(`
            UPDATE users_sessions us SET end_login = NOW() WHERE us.user_id = $1 AND us.end_login IS NULL; 
        `, [userId]);

        return result.rows;
    }

    async createUserSession(userId, token) {
        await this.conn.connect();
        const result = await this.conn.query(`
            INSERT INTO users_sessions (user_id, start_login, token)
                VALUES ($1, NOW(), $2);
        `, [userId, token]);

        return result.rows;
    }
    
    async verifyRevogedToken(token) {
        await this.conn.connect();
        const result = await this.conn.query(`
            SELECT us.id, us.start_login, us.end_login, us.token FROM users_sessions us 
                WHERE us.end_login IS NOT NULL AND us.token = $1;
        `, [token]);

        return result.rows;
    }

}

export default LoginRepository;