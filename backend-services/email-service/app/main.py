from fastapi import FastAPI

app = FastAPI()

@app.get("/email")
def email():
    return {"service": "email", "status": "email sent"}
