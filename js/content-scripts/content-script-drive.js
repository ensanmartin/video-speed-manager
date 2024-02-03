let driveIframeDOM = document.querySelector('#drive-viewer-video-player-object-0');

// const checkIframe = setInterval(() => {
//     if (driveIframeDOM === null) {
//         driveIframeDOM = document.querySelector('#drive-viewer-video-player-object-0');

//     } else {
//         clearInterval(checkIframe);

//         console.log(driveIframeDOM);
//         console.log(driveIframeDOM.contentWindow);
//         console.log(driveIframeDOM.contentDocument);
        
//     }
// }, 15000)

console.log(driveIframeDOM)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    videoDOM = document.querySelector('iframe').querySelector('video');
    
    //console.log(videoDOM);
    
    if (request.speed === "change") {
        videoDOM.playbackRate = request.newSpeed;
        sendResponse({currentSpeed: videoDOM.playbackRate});

    } else if (request.video === "exists" && videoDOM !== null) {
        sendResponse({videoExists: true, lastSpeed: videoDOM.playbackRate});

    } else {
        sendResponse({videoExists: false, lastSpeed: 1.0});
        
    } 
});