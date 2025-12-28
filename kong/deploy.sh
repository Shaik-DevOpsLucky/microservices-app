### PostgreSQL for Kong
docker run -d --name kong-postgres --network microservices-net -e POSTGRES_USER=kong -e POSTGRES_PASSWORD=kong -e POSTGRES_DB=kong -p 5432:5432 postgres:13

### Kong Migrations (ONE TIME)
docker run --rm --network microservices-net -e KONG_DATABASE=postgres -e KONG_PG_HOST=kong-postgres -e KONG_PG_USER=kong -e KONG_PG_PASSWORD=kong kong:3.6 kong migrations bootstrap

### Start Kong
docker run -d --name kong --network microservices-net -e KONG_DATABASE=postgres -e KONG_PG_HOST=kong-postgres -e KONG_PG_USER=kong -e KONG_PG_PASSWORD=kong -e KONG_ADMIN_LISTEN=0.0.0.0:8001 -p 8000:8000 -p 8001:8001 kong:3.6
