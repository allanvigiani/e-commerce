import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import login from './api/login/routes/login.js';
import user from './api/user/routes/user.js';
import product from './api/product/routes/product.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', login);
app.use('/user', user);
app.use('/product', product);

app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`);
});

export default app;