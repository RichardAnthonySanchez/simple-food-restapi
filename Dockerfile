# Use an official Node.js runtime as a base image
FROM node:23.1.0

# Set working directory inside container
WORKDIR /usr/src/

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app’s source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
