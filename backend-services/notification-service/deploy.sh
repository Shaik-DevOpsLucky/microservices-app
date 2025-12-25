#!/bin/bash

docker build -t moulashaik9618/notification-service:1.0 .
docker push moulashaik9618/notification-service:1.0

docker stop notification-service || true
docker rm notification-service || true

docker run -d \
  --name notification-service \
  --network microservices-net \
  -p 3003:3000 \
  --restart unless-stopped \
  moulashaik9618/notification-service:1.0

docker ps | grep notification-service
echo "Notification Service Deployed Successfully"
