# Use the official Node.js 18 image as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
#RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app
#CMD ["npm", "start"]
CMD ["npm", "run", "dev"]