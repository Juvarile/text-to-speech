const maxCharacters = 1000;
const url = 'https://api.voicerss.org/';
const apiKey = 'a0f50ac64f4747c0b2966b45f8fe4831';
const whitespaceError = 'Text must contain text characters other than empty spaces';
const buildUrl = (str) => `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;
const emptyString = (str) => str.split('').every(_char => _char === ' ' || _char === '/n');

const playBtn = () => document.getElementById('play-btn');
const textInput = () => document.getElementById('text-input');
const appContainer = () => document.getElementById('app-container');
const errorContainer = () => document.getElementById('error-messages');
const clearErrors = () => errorContainer().innerHTML = '';

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
  if(!emptyString(textInput().value)){
      textInput().value = textInput().value.trim();
      new Audio(buildUrl(textInput().value)).play();
  }
   else
   displayErrorMsg(textInput().value);
});


document.addEventListener('DOMContentLoaded', () => {
    const containerHeight = appContainer().clientHeight;
    const docHeight = window.innerHeight;
    appContainer().style.marginTop= `${docHeight/2 - containerHeight/2-25}`
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);
});

