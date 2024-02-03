const mainDOM = document.querySelector('main');

function debounce(callback, delay = 1000) {
    let timeout;

    return (...args) => {

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args)
        }, delay);

    }
}

const debounceInput = debounce((DOMSlider, DOMSliderValue) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {speed: "change", newSpeed: Number(DOMSlider.value)}, (response) => {
            DOMSliderValue.textContent = response.currentSpeed;
            DOMSlider.value = response.currentSpeed;
        });
    });
}, 150);

function createElements() {
    const h1 = document.createElement('h1');
    const input = document.createElement('input');
    const p = document.createElement('p');

    h1.textContent = 'Video Speed Manager';
    input.setAttribute('type', 'range');
    input.setAttribute('step', '0.1');
    input.setAttribute('min', '0.2');
    input.setAttribute('max', '4.0');
    input.setAttribute('value', '1.0');
    input.setAttribute('id', 'slider');
    p.setAttribute('id', 'slider-value');
    p.textContent = input.value;

    mainDOM.appendChild(h1);
    mainDOM.appendChild(input);
    mainDOM.appendChild(p);
}

function errorMessage() {
    const p = document.createElement('p');
    const btn = document.createElement('button');

    p.classList.add('error-msg');
    p.innerHTML = `There are <span>no videos</span> on this website. <br> :/`;
    btn.classList.add('reload-btn');
    btn.textContent = 'Reload?';

    btn.addEventListener('click', () => reloadPage());

    mainDOM.appendChild(p);
    mainDOM.appendChild(btn);
}

function startup() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {video: "exists", speed: "none"}, (response) => {

            if (chrome.runtime.lastError || response.videoExists === false) {
                errorMessage();

            } else {
                if (response.videoExists) {
                    createElements();
                    const slider = document.querySelector('#slider');
                    const sliderValue = document.querySelector('#slider-value');
    
                    slider.value = response.lastSpeed;
                    sliderValue.textContent = response.lastSpeed;
    
                    slider.addEventListener('input', () => {
                        sliderValue.textContent = slider.value;
                        debounceInput(slider, sliderValue);
                    });

                } 
            } 
        });
    });
}

function reloadPage() {
    document.querySelector('.error-msg').remove();
    document.querySelector('.reload-btn').remove();

    startup();
}

window.addEventListener('load', () => {
    document.querySelector('.loading-container').remove();

    startup();
});