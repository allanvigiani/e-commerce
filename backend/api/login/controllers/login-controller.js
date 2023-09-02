import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

import LoginRepository from "../repositories/login-repository.js";

dotenv.config();

const loginRepository = new LoginRepository();

class LoginController {

    constructor() {
        this.loginRepository = loginRepository;
    }

    async login(body) {
        try { 
            const { email, password } = body;

            if (!email || !password) {
                const errorMessage = `Preencha o email e a senha para realizar o Login.`;
                return {message: errorMessage, status: 400};
            }

            // SELECT para trazer o email e senha do banco pelo email
            const user = await this.loginRepository.getUserByEmail(email);
            if (!user){
                const errorMessage = `Email ou senha incorretos.`;
                return {message: errorMessage, status: 400};
            }


            const passwordIsValid = await bcrypt.compare(password, user.hash_password);
            if (!passwordIsValid){
                const errorMessage = `Email ou senha incorretos.`;
                return {message: errorMessage, status: 400};
            }

            const verifyLoginSession = await this.loginRepository.getUserSession(user.id);
            if (verifyLoginSession) {
                
                const now = new Date();
                const timestampDate = new Date(verifyLoginSession.start_login);

                const differenceInDays = (now - timestampDate) / (24 * 60 * 60 * 1000);

                if (differenceInDays > 1) {
                    await this.loginRepository.deleteUserSession(verifyLoginSession.id);
                } else {

                    const token = verifyLoginSession.token;

                    return {
                        message: {
                          success: `Usuário já está logado!`,
                          token  
                        },
                        status: 200
                    };
                }

            }
            const id = user.id;
            const name = user.name;
            const payload = { id, name, email };

            const token = jwt.sign({ payload }, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN,
            });
            
            await this.loginRepository.createUserSession(id, token);

            return {
                message: {
                  success: `Login realizado com sucesso!`,
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  token  
                },
                status: 200
            };
        } catch (error) {
            return {message: error, status: 500};
        }
    }

    async logout(userData) {
        try { 

            await this.loginRepository.deleteUserSessionByUserId(userData.payload.id);

            return {
                message: {
                  success: `Logout realizado!`
                },
                status: 200
            };
        
        } catch (error) {
            return {message: error, status: 500};
        }
    }

}

export default LoginController;