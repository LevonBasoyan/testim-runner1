# Use official Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install Chromium and necessary libraries
RUN apt-get update && apt-get install -y \
    chromium \
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

# Set Chromium path for tools like Testim
ENV CHROME_PATH=/usr/bin/chromium

# Copy package files and install only production dependencies
COPY package.json package-lock.json* ./
# Install prod deps only, skipping optional platform-specific binaries
RUN npm ci --omit=optional --omit=dev

# Copy the rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start your server
CMD ["node", "server.js"]
