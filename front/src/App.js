import './App.css';
import React, { useEffect, useState} from "react";





function App() {

  const [clientId, setClientId] = useState (Date.now());
  const [message, setMessage] = useState ([]);
  const [messages, setMessages] = useState ([]);
  const [WebSockets, setWebsockets] = useState ();




  useEffect(()=> {
    var ws = new WebSocket("ws://localhost:8000/ws/" + clientId)
    ws.onopen=() => {ws.send('connect to server')};


    ws.onmessage = (e) =>{
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    }



    setWebsockets(ws);
    // cleaner when we close page
    return () =>ws.close();
  }, [message, messages]);


  const sendMessage = () =>{
    WebSockets.send(message);
    WebSockets.onmessage = (e) =>{
      const message = JSON.parse(e.data);
      setMessages([...messages, message])
    };
    setMessage([]);
  }

  return (
    <div className="App">
      <div className="App-title">
        <h1 >Chat Martapp</h1>
        <h2 >Your ID:{clientId}<span id="ws-id"></span></h2>
      </div>

      <section className='App-layout'>

          <div className='App-chat-container'>
            {messages.map((value,index)=>{
              if (value.clientId === clientId){
                return(
                  <div className='App-msg' key={index}>
                    <div id='messages'>
                      <p className=''>client id {clientId}</p>
                      <p>{value.message}</p>
                    </div>
                  </div>
                );
              }else{
                return(
                  <div className='App-msg' key={index}>
                    <div id='messages'>
                      <p className=''>client id {clientId}</p>
                      <p>{value.message}</p>
                    </div>
                  </div>
                );
              }
            })}

            <form className='App-sendMsg' onChange={(e) => setMessage(e.target.value)} value={message}>
                    <input type="text"  className='App-input'/>
                    <button className='App-send' onClick={sendMessage}><ion-icon name="send-sharp"></ion-icon></button>
            </form>
            </div>


      </section>
    </div>
  );
}

export default App;
