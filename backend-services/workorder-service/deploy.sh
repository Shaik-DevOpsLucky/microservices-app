#!/bin/bash

docker build -t moulashaik9618/workorder-service:1.0 .
docker push moulashaik9618/workorder-service:1.0

docker stop workorder-service || true
docker rm workorder-service || true

docker run -d \
  --name workorder-service \
  --network microservices-net \
  -p 3005:3000 \
  --restart unless-stopped \
  moulashaik9618/workorder-service:1.0

docker ps | grep workorder-service
echo "Workorder Service Deployed Successfully"