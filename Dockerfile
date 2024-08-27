# Use a lightweight image for Node.js applications
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --production --no-optional && npm cache clean --force 

# Copy the rest of your project code
COPY . .

# Load environment variables from .env file
# RUN source .env

ENV NODE_ENV=production

# Set the user to use when running this image
# USER node


# Expose the port
EXPOSE 4000

# Entrypoint script allows passing arguments to npm start
ENTRYPOINT [ "npm", "start" ]
