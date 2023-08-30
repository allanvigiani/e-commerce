# Use uma imagem do Node.js como base
FROM node:14

# Crie e defina o diretório de trabalho
WORKDIR /app/backend

# Copie os arquivos de dependência e o código fonte
COPY package*.json ./
RUN npm install
COPY . .

# Exponha a porta do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]