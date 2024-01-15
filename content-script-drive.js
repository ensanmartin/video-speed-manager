let videoDOM = document.querySelector('iframe').querySelector('video');

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