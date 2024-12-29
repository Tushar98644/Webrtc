import { createPeerConnection, setupIceCandidateHandler } from "../services/webrtcService";

export const loginHandler = async (success: boolean,sendMessage:Function): Promise<void> => {
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
      
      const myConnection = createPeerConnection(localStream);
  
      setupIceCandidateHandler(myConnection,sendMessage());
  
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