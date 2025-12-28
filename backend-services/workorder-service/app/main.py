from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Workorder Service API",
    description="Workorder microservice documentation",
    version="1.0.0",
    docs_url="/api-docs",
    redoc_url="/redoc"
)

class WorkorderResponse(BaseModel):
    service: str
    status: str

@app.get("/workorder", response_model=WorkorderResponse, summary="Get Workorder", description="Retrieve workorder information")
def get_workorder():
    return {"service": "workorder", "status": "workorder processed"}

