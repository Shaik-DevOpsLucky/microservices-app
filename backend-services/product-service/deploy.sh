#!/bin/bash

docker build -t moulashaik9618/product-service:1.0 .
docker push moulashaik9618/product-service:1.0

docker stop product-service || true
docker rm product-service || true

docker run -d \
  --name product-service \
  --network microservices-net \
  -p 3006:3000 \
  --restart unless-stopped \
  moulashaik9618/product-service:1.0

docker ps | grep product-service
echo "Product Service Deployed Successfully"
