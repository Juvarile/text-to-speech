const maxCharacters = 1000;
const url = 'https://api.voicerss.org/';
const apiKey = 'a0f50ac64f4747c0b2966b45f8fe4831';

const buildUrl = (str) => `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;
console.log(buildUrl);

const playBtn = () => document.getElementById('play-btn');
const textInput = () => document.getElementById('text-input');
const appContainer = () => document.getElementById('app-container');

const listenerFn = ($event) => {
    if($event.target.value || $event.type === 'paste')
        playBtn().disabled = false;
    else
        playBtn.disabled = true;
};

document.addEventListener('DOMContentLoaded', () => {
    const containerHeight = appContainer().clientHeight;
    const docHeight = window.innerHeight;
    appContainer().style.marginTop= `${docHeight/2 - containerHeight/2-25}`
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);
});

playBtn().addEventListener('click', () => {
    new Audio(buildUrl(textInput().value)).play();
});