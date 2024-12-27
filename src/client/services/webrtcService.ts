import { iceServers } from "../config/iceServers";

export const createPeerConnection = (localStream: MediaStream): RTCPeerConnection => {
  const myConnection = new RTCPeerConnection({ iceServers });

  localStream.getTracks().forEach((track) => {
    myConnection.addTrack(track, localStream);
  });

  return myConnection;
};

export const setupIceCandidateHandler = (
  myConnection: RTCPeerConnection,
  sendMessage: (message: any) => void
) => {
  myConnection.onicecandidate = (event) => {
    if (event?.candidate) {
      sendMessage({
        type: "candidate",
        candidate: event.candidate,
      });
      console.log("The ICE candidate sent to peer:", event.candidate);
    }
  };
};
