## End-to-End Microservices Setup with Docker, Kong & Konga (EC2 | IP-based Routing)

This guide documents **everything from scratch**:
- EC2 Ubuntu setup
- Docker installation
- Application deployment
- Kong & Konga setup
- Service & Route configuration using **Konga UI**

> ❌ No YAML  
> ❌ No docker-compose  
> ❌ No domains  
> ✅ IP-based routing  
> ✅ Docker only  
> ✅ Real DevOps learning flow  

---

## 🖥️ Step 1: Provision EC2 Ubuntu Instance

- Launch **Ubuntu 20.04 / 22.04**
- Open inbound ports in Security Group:
  - `22` (SSH)
  - `1337` (Konga UI)
  - `8000` (Kong Proxy)
  - `8001` (Kong Admin API)
  - `3001–3006`, `8080` (optional for direct access)

---

## 🔐 Step 2: Login to EC2 VM

```bash
ssh ubuntu@<EC2_PUBLIC_IP>
```

Switch to root:

```bash
sudo -i
```

---

## 🐳 Step 3: Install Docker on Ubuntu

```bash
apt update -y && apt upgrade -y
apt install docker.io -y
systemctl start docker
systemctl enable docker
```

Add user to Docker group:

```bash
usermod -aG docker ubuntu
```

Logout & login again for group changes to apply.

Verify:

```bash
docker --version
```

---

## 🔑 Step 4: Docker Hub Authentication

```bash
docker login -u <dockerhub-username>
```

Example:
```bash
docker login -u moulashaik9618
```

---

## 📂 Step 5: Clone Git Repository

```bash
git clone https://github.com/Shaik-DevOpsLucky/microservices-app.git

git branch  (Use main branch)

cd microservices-app
```

---

## 📦 Step 6: Create Docker Network

```bash
docker network create microservices-net
```

---

## 🚀 Step 7: Deploy Backend & Frontend Services

Navigate and deploy **each service**:

```bash
cd /microservices-app/frontend
sh deploy.sh
cd /microservices-app/backend-services/asset-search-service
chmod +x deploy.sh
./deploy.sh
```

Repeat for:
- email-service
- notification-service
- payment-service
- workorder-service
- product-service

Deploy frontend:

```bash
cd frontend
chmod +x deploy.sh
./deploy.sh
```

Verify:

```bash
docker ps
```

---

## 🌉 Step 8: Deploy Kong & Konga

### PostgreSQL for Kong

```bash
docker run -d --name kong-postgres --network microservices-net -e POSTGRES_USER=kong -e POSTGRES_PASSWORD=kong -e POSTGRES_DB=kong -p 5432:5432 postgres:13
```

### Kong Migrations (ONE TIME)

```bash
docker run --rm --network microservices-net -e KONG_DATABASE=postgres -e KONG_PG_HOST=kong-postgres -e KONG_PG_USER=kong -e KONG_PG_PASSWORD=kong kong:3.6 kong migrations bootstrap
```

### Start Kong

```bash
docker run -d --name kong --network microservices-net -e KONG_DATABASE=postgres -e KONG_PG_HOST=kong-postgres -e KONG_PG_USER=kong -e KONG_PG_PASSWORD=kong -e KONG_ADMIN_LISTEN=0.0.0.0:8001 -p 8000:8000 -p 8001:8001 kong:3.6
```
OR else navigate the kong directory and run the deploy.sh file

### Start Konga

```bash
cd microservices-app/konga
sh deploy.sh
```

---

## 🌐 Step 9: Access Applications

- **Konga UI**:  
  http://<EC2_PUBLIC_IP>:1337

- **Kong Admin API**:  
  http://<EC2_PUBLIC_IP>:8001

- **Kong Proxy**:  
  http://<EC2_PUBLIC_IP>:8000

- **Frontend-APP**:  
  http://<EC2_PUBLIC_IP>:8080

---

## 🔗 Step 10: Connect Konga to Kong

In Konga UI:
- Go to **Connections**
- Create Connection

| Field | Value |
|-----|------|
| Name | kong-admin |
| Kong Admin URL | http://<EC2_PUBLIC_IP>:8001 |

Activate connection (green).

---

## 🌐 Internal Docker Hostnames (IMPORTANT)

Kong talks to services using **container names**, not localhost.

| Service | Host |
|------|------|
| asset-search | asset-search-service |
| email | email-service |
| notification | notification-service |
| payment | payment-service |
| workorder | workorder-service |
| product | product-service |

Port: `3000`

---

## 🧩 Step 11: Create Services & Routes in Konga UI

### Asset Search
- Service Name: asset-search  
- Host: asset-search-service  
- Port: 3000  
- Route Path: `/asset-search`  
- Strip Path: Enabled  

### Email
- Route: `/email`

### Notification
- Route: `/notification`

### Payment
- Route: `/payment`

### Workorder
- Route: `/workorder`

### Product
- Route: `/product`

(Repeat same pattern for all services)

---

## 🧪 Step 12: Test via Kong Proxy

```bash
curl http://<EC2_PUBLIC_IP>:8000/asset-search
curl http://<EC2_PUBLIC_IP>:8000/email
curl http://<EC2_PUBLIC_IP>:8000/notification
curl http://<EC2_PUBLIC_IP>:8000/payment
curl http://<EC2_PUBLIC_IP>:8000/workorder
curl http://<EC2_PUBLIC_IP>:8000/product
```

---

## ✅ Final Result

- EC2 Ubuntu configured
- Docker installed
- Microservices running
- Kong API Gateway active
- Konga UI managing routes
- IP-based routing working

---

## 🎯 Project Outcome

This setup reflects **real-world DevOps practices**:
- Container lifecycle management
- API Gateway configuration
- Service discovery using Docker DNS
- No shortcuts, no magic tools

---

**Author:** Shaik.Moulali, Cloud & DevOps Engineer
**Project:** Microservices Deployments in Docker environment 
**Environment:** AWS EC2 (Ubuntu)  
**Stack:** Docker, Kong, Konga, Node.js, Python, TypeScript, Shell/Bash
**Reachout me on LinkedIn:** https://www.linkedin.com/in/shaik-moulali-517b35278
**Email:** moula.cloud5@gmail.com
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/281fe858-929c-49cd-b514-df2d8d2a8c50" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e544f678-caf3-4ff6-bc4c-de78b1ccf6ce" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/87cad6af-f6cf-4e08-9599-26bcd502f9da" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/acd3b6d7-8a37-45a0-8e32-e7cc398041b5" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3bd98495-71bc-470f-8e3b-360c63a791e9" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7466cc8a-f5e8-45a8-8c4f-2608e71d0174" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b292d3fa-f0e3-4235-a00c-0a803e9134fc" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/15cf1dc9-fe20-424e-959a-889071caa407" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cb2cb5e7-349d-4df2-8e4b-5e5d890a7416" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/223d81c3-0908-457c-98b7-9846a8a84d70" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/70229465-ef9c-46bc-8a3b-c008c9dd7ba6" />

Happy Learning!!....


