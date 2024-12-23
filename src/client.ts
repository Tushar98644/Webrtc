const hasUserMedia = ():Boolean => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

const initializeMedia = async () => {

    if (!hasUserMedia()) {
        console.log('Webrtc not supported by browser!');
    }

    try {
       const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
       const video = document.querySelector('video') as HTMLVideoElement;
       if (video) video.srcObject = stream;
       else console.log('video element not found!');
       console.log('Media stream tracks:', stream.getTracks());
    }
    
    catch (error) {
        console.log(`Error in getting media stream tracks`, error);
    }
}

initializeMedia();
