
from fastapi import FastAPI
import routers
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


# CORS Config
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''@app.get('/')
async def home():
    return "welcome"
'''


app.include_router(routers.router)



