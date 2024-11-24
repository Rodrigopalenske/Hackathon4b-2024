FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /app-next

# Copiar os arquivos de dependências para o contêiner
COPY ./app-next/package.json ./app-next/package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do Next.js
COPY ./app-next .

# Rodar o build de produção do Next.js
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Rodar o Next.js em produção
CMD ["npm", "run", "dev"]
