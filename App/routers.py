
from datetime import datetime
import json
from fastapi import APIRouter, WebSocketDisconnect, WebSocket
from fastapi.responses import HTMLResponse
import html

from Websocketmodel import manager



router = APIRouter()


@router.get('/')

async def home():
    # return HTMLResponse(html.html)
    return "hola"



@router.websocket("/ws/{client_id}")

async def websocket_endpoint(websocket: WebSocket, client_id:int):
    """
    It receives a websocket and a client_id, connects the websocket to the manager, and then waits for
    messages from the websocket. When it receives a message, it broadcasts it to all the other
    websockets
    """
    await manager.connect(websocket)
    try:

        while True:
            data = await websocket.receive_text()
            #await manager.send_personal_message(f"your message: {data}", websocket)
            message = { "clientId":client_id, "message":data}
            #await manager.broadcast(f"client: # {client_id} wrote: {data}")
            await manager.broadcast(json.dumps(message))

    except WebSocketDisconnect:
            manager.disconnect(websocket)
            # message = {"time": time,"clientId":client_id, "message":"Left the chat"}
            # await manager.broadcast(json.dumps(message))
            # await manager.broadcast(f"#{client_id} left the chat")