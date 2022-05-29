import './App.css';
import React, { useEffect, useState} from "react";



// El error parece ser que cada ves que envio mensaje se actualiza y por tanto se borran los msg


function App() {

  const [clientId] = useState (Math.round(Date.now()/(1000)));

  const [message, setMessage] = useState ([]);
  const [messages, setMessages] = useState ([]);
  const [webSockets, setWebSockets] = useState();


  useEffect(()=> {
    const ws = new WebSocket(`ws://localhost:8000/ws/${clientId}` )
    ws.onopen= () => {ws.send("connect")};

    ws.onmessage = (e) =>{ const message = JSON.parse(e.data);
      setMessages([messages, message]);
    }

    setWebSockets(ws);


  },[message,messages]);

  const sendMessage = () =>{
    webSockets.send(message);
    webSockets.onmessage = (event) =>{
      const message = JSON.parse(event.data);
      setMessages([...messages, message])

    };
    setMessage([])
  };

  return (
    <div className="App">
      <div className="App-title">
        <h1 >Chat Martapp</h1>
        <h2 className='App-chatInfo-container' >Your ID:{clientId}<span id="ws-id"></span></h2>
     </div>

      <section className='App-layout'>
        
        <div className='App-chat-container'>
          <div className='App-chat-info-container'>
            {messages.map ((value, index) =>{
              if(value.clientId === clientId ){
                return(
                  <div key={index} className='App-my-msg-container' >
                    <div className='App-my-messages'>
                      <p className='App-id-client'>client id: {clientId}</p>
                      <p className='App-message'>{value.message}</p>
                    </div>
                  </div>
                );
              }else{
                return(
                  <div key={index} className='App-msg-other-container' >
                  <div className='other-messages'>
                    <p className='App-id-client'>client id:{clientId}</p>
                    <p className='App-message'>{value.message}</p>
                  </div>
                </div>
                );
              }
            })}
          </div>
        </div>
        <div className='App-sendMsg' >
              <input type="text"  className='App-input' placeholder='write your message' onChange= {(event) => setMessage(event.target.value)}  value={message}/>
              <button type="submit" className='App-send' onClick={sendMessage}  ><ion-icon name="send-sharp"></ion-icon></button>
        </div>

      </section>

    </div>
  );
}

export default App;
