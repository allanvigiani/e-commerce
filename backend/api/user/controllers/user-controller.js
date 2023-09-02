import bcrypt from 'bcrypt';

import UserRepository from "../repositories/user-repository.js";

const userRepository = new UserRepository();

class UserController {

    constructor() {
        this.saltRandsPassword = 10;
        this.userRepository = userRepository;
    }

    async register(body) {
        try { 
            const { name, email, password } = body;

            if (!name || !email || !password) {
                const errorMessage = `Campos não recebidos.`;
                return {message: errorMessage, status: 400};
            }

            const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!regexEmail.test(email)) {
                const errorMessage = `Email não é válido.`;
                return {message: errorMessage, status: 400};
            }

            const hash = await bcrypt.hash(password, this.saltRandsPassword);

            const user = {
                name: name,
                email: email,
                password: hash,
                created_at: new Date(),
            }

            const result = this.userRepository.createUser(user);
            if (!result){
                const errorMessage = `Erro ao cadastrar o usuário.`;
                return {message: errorMessage, status: 500};
            }

            return {message: `Usuário cadastrado com sucesso!`, status: 201};
        } catch (error) {
            return {message: error, status: 500};
        }
    }

}

export default UserController;