docker run -d \
  --name konga \
  --network microservices-net \
  -p 1337:1337 \
  -e NODE_ENV=production \
  pantsel/konga
