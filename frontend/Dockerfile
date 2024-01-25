# Use the official Node.js image with version 14
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json package-lock*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set production environment
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Run the build command
RUN npm run build

# Start the app
CMD ["npm", "start"]