import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import login from './api/login/routes/login.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', login);

app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`);
});

export default app;