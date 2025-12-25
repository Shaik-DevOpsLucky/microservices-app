from fastapi import FastAPI

app = FastAPI()

@app.get("/workorder")
def workorder():
    return {"service": "workorder", "status": "created"}
