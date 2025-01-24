from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend'in çalıştığı URL burada belirtilebilir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/read-excel")
async def read_excel():
    try:
        # Excel dosyasını oku
        df = pd.read_excel("data.xlsx")  # data.xlsx dosyasının aynı dizinde olduğundan emin olun
        data = df.to_dict(orient="records")  # DataFrame'i JSON formatına dönüştür

        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
