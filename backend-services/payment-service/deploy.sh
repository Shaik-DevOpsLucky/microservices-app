#!/bin/bash

docker build -t moulashaik9618/payment-service:1.0 .
docker push moulashaik9618/payment-service:1.0

docker stop payment-service || true
docker rm payment-service || true

docker run -d \
  --name payment-service \
  --network microservices-net \
  -p 3004:3000 \
  --restart unless-stopped \
  moulashaik9618/payment-service:1.0

docker ps | grep payment-service
echo "Payment Service Deployed Successfully"
