import './App.css';
import React, { useEffect, useState} from "react";


//   On Your Network:  http://192.168.1.10:3000


function App() {

  const [clientId] = useState (Math.round(Date.now()/(1000)));

  const [message, setMessage] = useState ([]);
  const [messages, setMessages] = useState ([]);
  const [webSockets, setWebSockets] = useState();


  useEffect(()=> {
    const ws = new WebSocket(`ws://localhost:8000/ws/${clientId}` )
    ws.onopen= (e) => {console.log("connect to server",e)};
    ws.onclose = () => {console.log("unknown")}

/* A function that is called when a message is received from the server. It parses the message and then
adds it to the messages array. */
    ws.onmessage = (e) =>{ const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    }

    setWebSockets(ws);
    return ()=> {ws.close();}
  },[messages]);




/*The sendMessage function is called when the user clicks the send button. It prevents the default
action of the event, sends the message to the server, and then sets the message to an empty string*/

  const sendMessage = (event) =>{
    event.preventDefault();
    webSockets.send(message);

    webSockets.onmessage =  (e) => {
        const message = JSON.parse(e.data)
          setMessages([...messages, message])};



    setMessage([]);



  };

    const AppChatContainer = document.querySelector('.App-chat-container')
    AppChatContainer.scrollTop = AppChatContainer.scrollHeight;



  return (
    <div className="App">
      <div className="App-title">
        <h1 >Chat Martapp</h1>

     </div>

      <section className='App-layout'>
      <div className='App-chatInfo-container' ><h2 className='App-status-data'>Your ID:{clientId}</h2></div>
        <div className='App-chat-container'>
          <div className='App-chat-info-container'>
            {messages.map ((value, index) =>{
              if(value.clientId === clientId ){
                return(
                  <div key={index} className='App-my-msg-container' >
                    <div className='App-my-messages'>
                      <p className='App-id-client'>client id: {value.clientId}</p>
                      <p className='App-message'>{value.message}</p>
                    </div>
                  </div>
                );
              }else{
                return(
                  <div key={index} className='App-msg-other-container' >
                  <div className='other-messages'>
                    <p className='App-id-client'>client id:{value.clientId}</p>
                    <p className='App-message'>{value.message} </p>
                  </div>
                </div>
                );
              }
            })}
          </div>

        </div>
        <form className='App-sendMsg' onSubmit={sendMessage} >
              <input type="text"  className='App-input' placeholder='write your message'  onChange={(event) => setMessage(event.target.value)} value={message} />
              <button type="submit/text" className='App-send' ><ion-icon name="send-sharp" ></ion-icon></button>
        </form>


      </section>

    </div>
  );
}

export default App;
