const connection = new WebSocket("ws://localhost:3000");

const loginInput = document.querySelector("#loginInput") as HTMLInputElement;
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;
const loginPage = document.querySelector("#loginPage") as HTMLDivElement;
const callPage = document.querySelector("#callPage") as HTMLDivElement;

if (!loginInput || !loginBtn) {
  console.error("Required elements not found in the DOM!");
}

var connectedUser: any;

connection.onopen = () => {
  console.log("Connection was created!");
};

connection.onerror = (err) => {
  console.log("An error occured", err);
};

connection.onclose = () => {
  console.log("connection was closed!");
};

const handleLogin = () => {
  const name = loginInput?.value;
  console.log("The name in the input:", name);

  if (name.length > 0) {
    sendMessage({
      name: name,
      type: "login",
    });
  }
};

loginBtn.addEventListener("click", handleLogin);

connection.onmessage = (message) => {
  console.log("Got message", message.data);
  const data = JSON.parse(message.data);

  switch (data.type) {
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
};

const onLogin = async (success: boolean): Promise<void> => {
  if (!success) {
    alert("Oops...try a different username");
    return;
  }

  const loginPage = document.querySelector("#loginPage") as HTMLElement;
  const callPage = document.querySelector("#callPage") as HTMLElement;

  loginPage.style.display = "none";
  callPage.style.display = "block";

  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    const localVideo = document.querySelector(
      "#localVideo"
    ) as HTMLVideoElement;
    localVideo.srcObject = localStream;

    const configuration = {
      iceServers: [{ urls: "stun:stun.1.google.com:19302" }],
    };

    const myConnection = new RTCPeerConnection(configuration);
    console.log("RTCPeerConnection object created:", myConnection);

    localStream.getTracks().forEach((track) => {
      myConnection.addTrack(track, localStream);
    });

    myConnection.onicecandidate = (event) => {
      if (event?.candidate) {
        sendMessage({
          type: "candidate",
          candidate: event.candidate,
        });
        console.log("The ICE candidate sent to peer:", event.candidate);
      }
    };

    const remoteVideo = document.querySelector("#remoteVideo") as HTMLVideoElement;
    myConnection.ontrack = (event) => {
      if (event.streams[0]) {
        remoteVideo.srcObject = event.streams[0];
        console.log("Remote stream received:", event.streams[0]);
      }
    };
  } catch (error) {
    console.error("Error during login or WebRTC setup:", error);
    alert("An error occurred. Please try again.");
  }
};

const sendMessage = (message: any) => {
  if (connectedUser) message.name = connectedUser;

  connection.send(JSON.stringify(message));
};
