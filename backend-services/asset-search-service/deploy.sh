#!/bin/bash

echo "BUILD IMAGE"
docker build -t moulashaik9618/asset-search-service:1.0 .

echo "PUSH IMAGE"
docker push moulashaik9618/asset-search-service:1.0

echo "STOP CONTAINER (IF RUNNING)"
docker stop asset-search-service || true

echo "REMOVE CONTAINER (IF EXISTS)"
docker rm asset-search-service || true

echo "CREATE NEW CONTAINER"
docker run -d \
  --name asset-search-service \
  --network microservices-net \
  -p 3001:3000 \
  --restart unless-stopped \
  moulashaik9618/asset-search-service:1.0

echo "VERIFY"
docker ps | grep asset-search-service
echo "DEPLOYMENT COMPLETE"
