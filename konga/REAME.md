🧭 CONFIGURE ROUTES IN KONGA UI

Open:

http://localhost:1337


Create admin user

Add connection → http://kong:8001

Create services:

URL: http://asset-search:3000

URL: http://email:3000

etc.

Create routes:

/assets

/email

/payment

/workorder

/product

/notify

🔥 FINAL TEST (END-TO-END)
curl http://localhost:8000/assets
curl http://localhost:8000/email
curl http://localhost:8000/payment


Then open frontend:

http://localhost:8080


Buttons should now work 🎉