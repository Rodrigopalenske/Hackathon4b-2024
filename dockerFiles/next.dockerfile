FROM node:18-alpine

WORKDIR /app-next

COPY ../app-next/package.json ../app-next/package-lock.json ./
RUN npm install

COPY ../app-next .

EXPOSE 3000
CMD ["npm", "run", "dev"]