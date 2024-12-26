
const connection =  new WebSocket('ws://localhost:3000');

const loginInput = document.querySelector('#loginInput') as HTMLInputElement;
const loginBtn = document.querySelector('#loginBtn') as HTMLButtonElement;

if (!loginInput || !loginBtn) {
    console.error("Required elements not found in the DOM!");
}

var connectedUser: any;

connection.onopen = () =>{
    console.log("Connection was created!");
}

connection.onerror = (err) => {
    console.log("An error occured",err);
}

connection.onclose = () => {
    console.log("connection was closed!");
}

const handleLogin = () => {
  const name = loginInput?.value;
  console.log('The name in the input:',name);

  if (name.length > 0) {
    sendMessage({
        name: name,
        type: "login"
    })
  }
};

loginBtn.addEventListener("click",handleLogin);

connection.onmessage = (message) => {
    console.log("Got message", message.data);
    const data = JSON.parse(message.data);

    switch(data.type){
        case "login":
            onLogin(data.success);
            break;
        // case "offer":
        //     onOffer();
        //     break;
        // case "answer":
        //     onAnswer();
        //     break;
        // case "candidate":
        //     onCandidate();
        //     break;
        default:
            break;
    }
}

const onLogin = (success:Boolean):void => {
    if (!success) alert("oops...try a different username"); 

    const configuration = {
        "iceServers" : [{ "urls": "stun:stun.1.google.com:19302" }]
    }

    const myConnection = new RTCPeerConnection(configuration);
    console.log("RTCPeerConnection object was created"); 
    console.log(myConnection); 

    myConnection.onicecandidate = (event)=>{
        if (event?.candidate) sendMessage({
            type:'candidate',
            candidate: event.candidate
        })
        console.log("The ice candidate sent to peer was:",event.candidate);
    };
    
}

const sendMessage = (message:any) => {
    if (connectedUser) message.name = connectedUser;

    connection.send(JSON.stringify(message));
}