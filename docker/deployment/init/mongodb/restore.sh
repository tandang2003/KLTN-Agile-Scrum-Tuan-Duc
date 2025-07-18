#!/bin/bash
set -e
echo "[INFO] Waiting for MongoDB to be ready..."
until mongosh --username "$MONGO_INITDB_ROOT_USERNAME" \
              --password "$MONGO_INITDB_ROOT_PASSWORD" \
              --authenticationDatabase admin \
              --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 2
done

echo "[INFO] MongoDB is ready. Restoring data..."
mongorestore --host localhost \
             --username "$MONGO_INITDB_ROOT_USERNAME" \
             --password "$MONGO_INITDB_ROOT_PASSWORD" \
             --authenticationDatabase admin \
             --drop /dump

echo "[INFO] MongoDB restore completed."
