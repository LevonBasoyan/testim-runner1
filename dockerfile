FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install Chromium and required dependencies
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

# Set Puppeteer executable path for Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=optional --omit=dev

# Copy the rest of the application files
COPY . .

# ✅ Ensure testim binary is executable
RUN chmod +x node_modules/.bin/testim

# Railway expects a healthcheck route
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080 || exit 1

# Expose app port
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
