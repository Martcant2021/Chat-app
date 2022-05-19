
from fastapi import FastAPI
import routers



app = FastAPI()


'''@app.get('/')
async def home():
    return "welcome"
'''


app.include_router(routers.router)



