const hasUserMedia = (): Boolean => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

const initializeMedia = async () => {
  if (!hasUserMedia()) {
    console.log("Webrtc not supported by browser!");
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    const video = document.querySelector("video") as HTMLVideoElement;
    if (video) video.srcObject = stream;
    else console.log("video element not found!");
    console.log("Media stream tracks:", stream.getTracks());

    const btnGetAudioTracks = document.getElementById(
      "btnGetAudioTracks"
    ) as HTMLButtonElement;
    const btnGetTrackById = document.getElementById(
      "btnGetTrackById"
    ) as HTMLButtonElement;
    const btnGetTracks = document.getElementById(
      "btnGetTracks"
    ) as HTMLButtonElement;
    const btnGetVideoTracks = document.getElementById(
      "btnGetVideoTracks"
    ) as HTMLButtonElement;
    const btnRemoveAudioTrack = document.getElementById(
      "btnRemoveAudioTrack"
    ) as HTMLButtonElement;
    const btnRemoveVideoTrack = document.getElementById(
      "btnRemoveVideoTrack"
    ) as HTMLButtonElement;
    const btnAddAudioTrack = document.getElementById(
        "btnAddAudioTrack"
    ) as HTMLButtonElement;
    const btnAddVideoTrack = document.getElementById(
        "btnAddVideoTrack"
    ) as HTMLButtonElement;

    btnGetAudioTracks.addEventListener("click", () => {
      console.log("getAudioTracks");
      console.log(stream.getAudioTracks());
    });

    btnGetTrackById.addEventListener("click", () => {
      console.log("getTrackById");
      console.log(stream.getTrackById(stream.getAudioTracks()[0].id));
    });

    btnGetTracks.addEventListener("click", () => {
      console.log("getTracks()");
      console.log(stream.getTracks());
    });

    btnGetVideoTracks.addEventListener("click", () => {
      console.log("getVideoTracks()");
      console.log(stream.getVideoTracks());
    });

    btnRemoveAudioTrack.addEventListener("click", () => {
      console.log("removeAudioTrack()");
      stream.removeTrack(stream.getAudioTracks()[0]);
    });

    btnRemoveVideoTrack.addEventListener("click", () => {
      console.log("removeVideoTrack()");
      stream.removeTrack(stream.getVideoTracks()[0]);
    });

    btnAddAudioTrack.addEventListener("click", () => {
      console.log("addAudioTrack()");
      navigator.mediaDevices.getUserMedia({audio: true}).then((audioStream) => {
        stream.addTrack(audioStream.getAudioTracks()[0]);
      });
    });

    btnAddVideoTrack.addEventListener("click", () => {
      console.log("addVideoTrack()");
      navigator.mediaDevices.getUserMedia({video: true}).then((videoStream) => {
        stream.addTrack(videoStream.getVideoTracks()[0]);
      });
    });
    
  } catch (error) {
    console.log(`Error in getting media stream tracks`, error);
  }
};

initializeMedia();
