"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const hasUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};
const initializeMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!hasUserMedia()) {
        console.log("Webrtc not supported by browser!");
    }
    try {
        const stream = yield navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });
        const video = document.querySelector("video");
        if (video)
            video.srcObject = stream;
        else
            console.log("video element not found!");
        console.log("Media stream tracks:", stream.getTracks());
        const btnGetAudioTracks = document.getElementById("btnGetAudioTracks");
        const btnGetTrackById = document.getElementById("btnGetTrackById");
        const btnGetTracks = document.getElementById("btnGetTracks");
        const btnGetVideoTracks = document.getElementById("btnGetVideoTracks");
        const btnRemoveAudioTrack = document.getElementById("btnRemoveAudioTrack");
        const btnRemoveVideoTrack = document.getElementById("btnRemoveVideoTrack");
        const btnAddAudioTrack = document.getElementById("btnAddAudioTrack");
        const btnAddVideoTrack = document.getElementById("btnAddVideoTrack");
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
            navigator.mediaDevices.getUserMedia({ audio: true }).then((audioStream) => {
                stream.addTrack(audioStream.getAudioTracks()[0]);
            });
        });
        btnAddVideoTrack.addEventListener("click", () => {
            console.log("addVideoTrack()");
            navigator.mediaDevices.getUserMedia({ video: true }).then((videoStream) => {
                stream.addTrack(videoStream.getVideoTracks()[0]);
            });
        });
    }
    catch (error) {
        console.log(`Error in getting media stream tracks`, error);
    }
});
initializeMedia();
