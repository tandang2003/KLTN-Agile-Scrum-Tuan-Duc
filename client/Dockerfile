# Use an official Node.js runtime as the base image
FROM node:20-slim  AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of the project files to the container
COPY . .

# Set environment variables for the build
ARG BACKEND_URL

ENV VITE_BACKEND_URL=$BACKEND_URL


# Build the React app
RUN npm run build


# --- Production Stage (Nginx) ---
FROM nginx:alpine
# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
