
from fastapi import APIRouter, WebSocketDisconnect, WebSocket
from fastapi.responses import HTMLResponse
import html

from Websocketmodel import manager



router = APIRouter()

@router.get('/')

async def get():
    return HTMLResponse(html.html)


# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#             data = await websocket.receive_text()
#             await websocket.send_text(f"your message: {data}")


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id:int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"your message: {data}", websocket)
            await manager.broadcast(f"client: # {client_id} wrote: {data}")

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"#{client_id} left the chat")