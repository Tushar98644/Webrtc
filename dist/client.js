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
        console.log('Webrtc not supported by browser!');
    }
    try {
        const stream = yield navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const video = document.querySelector('video');
        if (video)
            video.srcObject = stream;
        else
            console.log('video element not found!');
        console.log('Media stream tracks:', stream.getTracks());
    }
    catch (error) {
        console.log(`Error in getting media stream tracks`, error);
    }
});
initializeMedia();
