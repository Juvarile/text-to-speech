const url = 'https://api.voicerss.org/';
const apiKey = 'a0f50ac64f4747c0b2966b45f8fe4831';
const whitespaceError = 'Text must contain text characters other than empty spaces';
const buildUrl = (str) => `${url}?key=${apiKey}&hl=en-us&src=${str}&f=48khz_16bit_stereo`;
const playBtn = () => document.getElementById('play-btn');

const appContainer = () => document.getElementById('app-container');
const errorContainer = () => document.getElementById('error-messages');
const clearErrors = () => errorContainer().innerHTML = '';

const container = () => document.querySelector('#input-container');



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
   
      container().value = container().innerText.trim();
      new Audio(buildUrl(container().innerText)).play();
      const luminator = lumin(container());
      luminator.start(50000); // 50000ms to highlight//
      
     
});

// document.addEventListener('DOMContentLoaded', () => {
//     const containerHeight = appContainer().clientHeight;
//     const docHeight = window.innerHeight;
//     appContainer().style.marginTop= `${docHeight/2 - containerHeight/2-25}`
//     textInput().addEventListener('keyup', listenerFn);
//     textInput().addEventListener('paste', listenerFn);
// });




