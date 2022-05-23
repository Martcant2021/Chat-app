
from datetime import datetime
import json
from tokenize import Double
from fastapi import APIRouter, WebSocketDisconnect, WebSocket
from fastapi.responses import HTMLResponse
import html

from Websocketmodel import manager



router = APIRouter()


@router.get('/')

async def home():
    return "hello"


# router to call the manager class
@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id:int):
    await manager.connect(websocket)
    now = datetime.now()
    time = now.strftime("%H:%M")
    try:
        while True:
            data = await websocket.receive_text()
            #await manager.send_personal_message(f"your message: {data}", websocket)
            message = {"client_id":client_id, "message":data}
            #await manager.broadcast(f"client: # {client_id} wrote: {data}")
            await manager.broadcast(json.dumps(message))
            break

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        message = {"client_id":client_id, "message":"Left the chat"}

        await manager.broadcast(json.dumps(message))

        #await manager.broadcast(f"#{client_id} left the chat")