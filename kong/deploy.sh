docker run -d \
  --name kong \
  --network microservices-net \
  -p 8000:8000 \
  -p 8001:8001 \
  -e KONG_DATABASE=off \
  -e KONG_ADMIN_LISTEN=0.0.0.0:8001 \
  kong:3.6
