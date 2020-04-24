/*--------------------------------------------Selecting Elements---------------------------------------------*/
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


/*-------Creating an array of objects where each one of them contains an image and related text--------*/
const data = [
    {
        image: './images/drink.jpeg',
        text:  "I'm thirsty"
    },
    {
        image: './images/food.jpeg',
        text:  "I'm hungry"
    },
    {
        image: './images/angry.jpeg',
        text:  "I'm angry"
    },
    {
        image: './images/grandma.jpeg',
        text:  "I love my grandma"
    },
    {
        image: './images/happy.jpeg',
        text:  "I'm happy"
    },
    {
        image: './images/home.jpeg',
        text:  "This is my house"
    },
    {
        image: './images/hurt.jpeg',
        text:  "My leg hurts"
    },
    {
        image: './images/outside.jpeg',
        text:  "I wanna go to a beach"
    },
    {
        image: './images/sad.jpeg',
        text:  "I miss you friendie"
    },
    {
        image: './images/scared.jpeg',
        text:  "That is a scary sound "
    },
    {
        image: './images/school.jpeg',
        text:  "I have to go to school tomorrow"
    },
    {
        image: './images/tired.jpeg',
        text:  "I'm done for today"
    }
];

/*-------Lets show those objects in DOM---------*/
data.forEach(item => {
    const box = document.createElement('div');
    box.classList.add('box');
    const {image,text} = item;
    box.innerHTML = `
             <img src="${image}" alt="${text}">   
             <p>${text}</p>
    `;
    
    box.addEventListener('click',()=>{
      setTextMessage(text);
      speakText();

      box.classList.add('active');
       setTimeout(()=>{
        box.classList.remove('active');
       },1000);
    });
    main.appendChild(box);
});


/*--------the message we want them to speak----------*/
const message = new SpeechSynthesisUtterance();


/*--------all the voices are stored here-------------*/
let voices = [];


/*----------populate the voices above into DOM------------*/
function populateVoiceList(){
    voices = speechSynthesis.getVoices();
    // console.log(voices);
    voices.forEach(voice => {
       const option = document.createElement('option');
       const {name,lang} = voice;
       console.log(name,lang);
       option.value = name;
       option.innerText = `${name} ${lang}`;

       voicesSelect.appendChild(option);
    });
}


/*--------set the message to whatever you want----------*/
function setTextMessage(text){
    message.text = text;
}


/*-----------let them speak it----------------*/
function speakText(){
   speechSynthesis.speak(message);
}


/*--------you might wanna try different voices out there-----------*/
function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}


/*--------- voices changed---------------------------------*/
speechSynthesis.addEventListener('voicesChanged',populateVoiceList);


/*-------------toggle text box-----------------------------*/
toggleBtn.addEventListener('click',() => document.getElementById('text-box').classList.toggle('show'));


/*-------------close the text box using close button---------------------*/
closeBtn.addEventListener('click',() => document.getElementById('text-box').classList.remove('show'));


/*------------------when different voice has been selected-------------------*/
voicesSelect.addEventListener('change',setVoice);


/*-----------------read button for the custom text-----------------*/
readBtn.addEventListener('click', ()=>{
   setTextMessage(textarea.value);
   speakText();
});


/*---------------set Interval to let the voices load and then populate into DOM ---------------*/
var timer = setInterval( () => {
    populateVoiceList();
    clearInterval(timer);
},5000);