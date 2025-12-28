from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Email Service API",
    description="Email microservice documentation",
    version="1.0.0",
    docs_url="/api-docs",
    redoc_url="/redoc"
)

class EmailResponse(BaseModel):
    service: str
    status: str

@app.get("/email", response_model=EmailResponse, summary="Send Email", description="Process and send an email")
def email():
    return {"service": "email", "status": "email sent"}
