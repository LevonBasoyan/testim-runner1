FROM node:18

WORKDIR /usr/src/app

# Install Chromium and dependencies
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
    curl \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy and install dependencies
COPY package*.json ./
RUN npm install --omit=optional --omit=dev

# Copy rest of the app
COPY . .

# ✅ Fix permission on the testim binary
RUN chmod +x node_modules/.bin/testim

# Expose the app port
EXPOSE 8080

# Start server
CMD ["node", "server.js"]
