FROM node:18

WORKDIR /usr/src/app

# Copy and install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy rest of the app
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
