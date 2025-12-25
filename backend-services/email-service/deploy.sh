#!/bin/bash

docker build -t moulashaik9618/email-service:1.0 .
docker push moulashaik9618/email-service:1.0

docker stop email-service || true
docker rm email-service || true

docker run -d \
  --name email-service \
  --network microservices-net \
  -p 3002:3000 \
  --restart unless-stopped \
  moulashaik9618/email-service:1.0

docker ps | grep email-service
echo "Email Service Deployed Successfully"
