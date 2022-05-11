
from fastapi import FastAPI
import routers



app = FastAPI()


# @app.get('/')
# async def home():
#     return "welcome"



app.include_router(routers.router)



# Crear El websocket
#implementar los routers

# version 1.0:
# funcionalidad basica: chat a otra ventana

# version 2.0 final:
# implementar creacion de usuarios con jwt
# crear el fronted con react o vue.js