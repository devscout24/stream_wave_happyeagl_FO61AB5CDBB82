FROM node:20-alpine

WORKDIR /app

# Copy the database file
COPY db.json .

# Install json-server globally
RUN npm install -g json-server

EXPOSE 5000

# Start json-server
CMD ["json-server", "--watch", "db.json", "--port", "5000", "--host", "0.0.0.0"]
