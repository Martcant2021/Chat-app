
html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat App</title>
    </head>
    <body style="background-color: #08AEEA; background-image: linear-gradient(63deg, #08AEEA 0%, #089e59 100%);">
        <h1 class="p-2 m-2" style="text-align: center;">Chat Martapp</h1>
        <h2 style="text-align: center;padding: 2px;margin: 10px;">Your ID: <span id="ws-id"></span></h2>
        <div style="text-align: center;">
            <form action="" onsubmit="sendMessage(event)">
                <input type="text" id="messageText" autocomplete="off"/>
                <button>Send</button>
            </form>
        </div>
        <section style="width: 100%;display: flex;flex-direction: column;gap: 20px;justify-content: center;align-items: center;">
        <div style="border-radius: 11px;padding: 2px;box-shadow: 0px 0px 37px 9px #061D10;width: 22rem;margin-top: 2rem;">
            <ul id='messages'>
            </ul>
        </div>
        </section>
        <script>
            var client_id = Date.now()
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""