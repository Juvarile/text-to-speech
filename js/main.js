const maxCharacters = 1000;
const url = 'https://api.voicerss.org/';
const apiKey = 'a0f50ac64f4747c0b2966b45f8fe4831';
const whitespaceError = 'Text must contain text characters other than empty spaces';
const buildUrl = (str) => `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;
const emptyString = (str) => str.split('').every(_char => _char === ' ' || _char === '/n');

const playBtn = () => document.getElementById('play-btn');
const textInput = () => document.getElementById("text-input").innerHTML = "Welcome to our chatbot, in times where privacy has been an ever growing concern for a lot of people it may be interesting to know what the general moral balance is. Take COVID-19 as an example, should we, for example, have to download an app that knows our location and medical information to provide a more ‘safe’ environment for others and give away some privacy to achieve that? Some of you may say ‘Yes! Ofcourse!, while others won’t even think about it, just because of the privacy concerns it brings. To get more insight into these topics, what's ‘right’ and what’s ‘wrong’ in some people's eyes, we have developed this chatbot. By interacting with it, you’ll indirectly help in understanding privacy and moral choices based around important topics, like COVID-19, so thank you for taking your time to help!";

const appContainer = () => document.getElementById('app-container');
const errorContainer = () => document.getElementById('error-messages');
const clearErrors = () => errorContainer().innerHTML = '';

const container = document.querySelector('#input-container');
const listenerFn = ($event) => {
    if($event.target.value || $event.type === 'paste')
        playBtn().disabled = false;
    else
        playBtn.disabled = true;
};

const displayErrorMsg = (val) => {
const errs = [];
if(emptyString(val)) errs.push(whitespaceError);
errs.forEach(_err => {
    const div = document.createElement('div');
    div.innerText = _err;
    errorContainer().appendChild(div);
    });
};
playBtn().addEventListener('click', () => {
      container().value = container().value.trim();
      new Audio(buildUrl(container().value)).play();
});

document.addEventListener('DOMContentLoaded', () => {
    const containerHeight = appContainer().clientHeight;
    const docHeight = window.innerHeight;
    appContainer().style.marginTop= `${docHeight/2 - containerHeight/2-25}`
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);
});

const luminator = lumin(container);
luminator.start(15000); // 5000ms to highlight


