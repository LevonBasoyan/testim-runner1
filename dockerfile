FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy files
COPY package.json yarn.lock ./
RUN yarn install --production

COPY . .

# Expose port and run
EXPOSE 3000
CMD ["node", "server.js"]
