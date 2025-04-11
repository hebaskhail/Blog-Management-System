# Use Node.js as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) for faster build cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that your app will run on (default: 3000 for NestJS)
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "run", "start:prod"]
