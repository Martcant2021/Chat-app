from typing import List
from fastapi import WebSocket


# manager class with chat functionalities 

class ConectionManager:

    def __init__(self) -> None:
        self.active_conections: List[WebSocket]= []

    async def connect(self, websocket:WebSocket):
        await websocket.accept()
        self.active_conections.append(websocket)

    def disconnect(self, websocket:WebSocket):
        self.active_conections.remove(websocket)

    async def send_personal_message(self, message: str, websocket:WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message:str):
        for connection in self.active_conections:
            await connection.send_text(message)

manager = ConectionManager()