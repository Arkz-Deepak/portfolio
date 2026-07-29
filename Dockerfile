# Use an official Nginx image for serving static files
FROM nginx:alpine

# Copy static assets over to nginx default public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
