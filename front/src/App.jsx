import './App.css';
import React, { useEffect, useState} from "react";





function App() {

  // const [clientId, setClientId] = useState ([{}]);
  // const [isOnline, setIsOnline] = useState (false);
  // const [textValue, setTextValue] = useState ([]);
  // const [message, setMessage] = useState ([]);
  // const [messages, setMessages] = useState ([]);
  // const [WebSocket, setWebsocket] = useState ([]);



useEffect(()=> {
  var ws = new WebSocket(`ws://localhost:8000/ws/`)
  ws.onopen=() => {ws.send('connect to server')};


  // ws.onmessage = (e) =>{
  //   const msg = JSON.parse(e.data);
  //   setMessage([...messages, msg])
  // }

  // setWebsocket(ws);
  // return () =>ws.close()
})


  return (
    <div className="App">
      <div className="App-title">
        <h1 >Chat Martapp</h1>
        <h2 >Your ID: <span id="ws-id"></span></h2>
      </div>

      <section className='App-layout'>

          <div className='App-chat-container'>
            <div className='App-msg'>
                <ul id='messages'>
                </ul>
            </div>
          

            <div className='App-sendMsg'>
              <form action="" onsubmit="" >
                  <input type="text" id="messageText" autocomplete="off" className='App-input'/>
                  <button className='App-send'><ion-icon name="send-sharp"></ion-icon></button>
              </form>
            </div>
          </div>


          

      </section>





    </div>
  );
}

export default App;
