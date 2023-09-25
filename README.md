# Projeto E-commerce

### Instalação do projeto
Clone do repositório
```sh
git clone https://github.com/allanvigiani/e-commerce.git
cd e-commerce
cp .env.example .env
openssl rand -hex 64
```
Atribua o valor recebino na variável de amviente AUTH_SECRET, ele será sua chave de acesso ao token
```dosini
AUTH_SECRET=código_gerado
```

Inicialize os containers do projeto
```sh
docker-compose up -d
```

Inicialize as API's do backend
```sh
cd backend
node app.js
```

Inicialize o frontend da aplicação
```sh
cd ..
cd frontend
npm run dev
```
