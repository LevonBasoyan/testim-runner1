# Use official Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install Chromium and required libraries
RUN apt-get update && apt-get install -y \
    chromium-browser \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set Chromium path for Testim CLI
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files and install dependencies
COPY package*.json ./

# 🔧 Use npm install (not ci) to avoid platform errors
RUN npm install --omit=optional --omit=dev

# ✅ Make Testim CLI executable
RUN chmod +x ./node_modules/.bin/testim

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080 || exit 1

  RUN apt-get update && apt-get install -y curl