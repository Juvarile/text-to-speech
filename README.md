# text-to-speech

## Inleiding
Werkende POC van een Text-to-speech. Eerste versie is gebasseerd op een textarea waar de gebruiker tekst in kan vullen. Als je daarna op de button klikt wordt het voorgelezen.

## Code 
### HTML
```<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <div id="app-container">
        <h1>Krantartikel TTS</h1>
        <div id="input-container">
            <textarea  id="text-input" placeholder="Type your text"></textarea>
        </div>
        <div id="control-container">
            <button disabled="true" id="play-btn">Play</button>
        </div>
        <div id="error-message"></div>
    </div>

    <script src="main.js"></script>
</body>
</html>```
## CSS
```body{
    background-image:url(bg.jpg);
    background-size:cover;
    margin:0;
    padding:0;
}

#app-container{
    width:800px;
    margin:auto;
}
#app-container h1{
    font-family:sans-serif;
    font-size: 54px;
    color:black;
    text-align:center;
    letter-spacing: 15px;
}
#input-container textarea{
    width: 100%;
    height:350px;
    resize:none;
    background-color:rgba(255,255,255,0.7);
    box-shadow:1px 1px 5px black;
    border: 1px solid white;
    padding:25px;
    font-family:"Merriweather", serif;
    border-radius:5px;
    font-size:24px;
    text-align:center;
}
#control-container{
    margin:25px;
    text-align:center;
}
#play-btn{
    width:100px;
    background-color:rgba(255,255,255,0.5);
    padding:15px;
    cursor:pointer;
    text-transform:uppercase;
    letter-spacing:1px;
    font-weight:700px;
    outline:none;
    border:2px solid black;
    font-family:"Poppins", sans-serif;
    border-radius:5px;
}
#play-btn:hover{
    background-color:rgba(255,255,255,0.7);
}
#play-btn:disabled{
    cursor:not-allowed;
    border: 2px solid gray;
}```
### Javascript
```const maxCharacters = 1000;
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

```
