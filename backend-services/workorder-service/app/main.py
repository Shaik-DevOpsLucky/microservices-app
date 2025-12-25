from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="workorder Service")

@app.get("/", response_class=HTMLResponse)
def root():
    return """
    <html>
      <head>
        <title>workorder Service</title>
      </head>
      <body>
        <h1>workorder Service is running</h1>
      </body>
    </html>
    """

