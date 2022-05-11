from typing import List
from fastapi import WebSocket




# manager class with the functionalities to send msg

class ConectionManager:

    def __init__(self) -> None:
        self.active_conection: List[WebSocket]= []

    async def connect(self, websocket:WebSocket):
        await websocket.accept()
        self.active_conection.append(websocket)

    def disconnect(self, websocket:WebSocket):
        self.active_conection.remove(websocket)

    async def send_personal_message(self, message: str, websocket:WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message:str):
        for connection in self.active_conection:
            await connection.send_text(message)

manager = ConectionManager()