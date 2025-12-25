#!/bin/bash
set -e   # ⬅️ STOP SCRIPT ON ANY ERROR

docker build -t moulashaik9618/frontend:1.0 .
docker push moulashaik9618/frontend:1.0

docker stop frontend-service || true
docker rm frontend-service || true

docker run -d \
  --name frontend-service \
  --network microservices-net \
  -p 8080:80 \
  --restart unless-stopped \
  moulashaik9618/frontend:1.0

docker ps | grep frontend-service
echo "Frontend Deployed Successfully"

