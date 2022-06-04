
from fastapi import FastAPI
import routers
<<<<<<< HEAD
=======
from fastapi.middleware.cors import CORSMiddleware
>>>>>>> react-front



app = FastAPI()


<<<<<<< HEAD
# @app.get('/')
# async def home():
#     return "welcome"

=======
# CORS Config
origins = ["*"]

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
>>>>>>> react-front


app.include_router(routers.router)



