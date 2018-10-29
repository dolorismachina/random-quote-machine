const quoteUrl = 'https://talaikis.com/api/quotes/random/';
const imgAPI = 'https://source.unsplash.com/random/1920x1080';

let backgroundImageBuffer = new Image();

// Element references
const bg1 = document.querySelector('#bg1');

const bg2 = document.querySelector('#bg2');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const twitterLink = document.querySelector('#twitter-share');
const twitterURL = 'https://twitter.com/intent/tweet?text=';

addEventListeners();



function fetchQuote() {
  window.fetch(quoteUrl)
    .then(res => res.json())
    .then(json => {
      injectQuote(json)
    .catch(e => console.error(e));
  });
}

function injectQuote(quoteData) {
  quoteText.textContent = `"${quoteData.quote}"`;
  quoteAuthor.textContent = quoteData.author;

  const url = encodeURI(`${twitterURL}${quoteData.quote} - ${quoteData.author}"`);
  twitterLink.href = url;

  quoteText.classList.add('fade-in');
}

function getNewQuote() {
  swapImages(backgroundImageBuffer.src);
  fetchQuote();
}

function swapImages(newImg) {
  const imgProp = `url("${newImg}")`;
  const oldImg = document.querySelector('#bg1').style.getPropertyValue('--img');
 
  bg1.style.setProperty('--img', imgProp);
  bg2.style.setProperty('--img', oldImg);

  addAnimation(bg1, 'fade-in');
  addAnimation(bg2, 'fade-out');

  backgroundImageBuffer = bufferBackground();
}

function addAnimation(target, animationName) {
  target.classList.add(animationName);
}

function removeAnimation(target, animationName) {
  target.classList.remove(animationName);
}

function bufferBackground() {
  backgroundImageBuffer.remove();

  const newBuffer = new Image();
  
  fetch(imgAPI)
  .then(res => {
    newBuffer.src = res.url;
  })
  .catch(e => console.error(e));

  return newBuffer;
}

function addEventListeners() {
  window.addEventListener('load', getNewQuote());

  bg1.addEventListener('animationend', e => {
    bg1.classList.remove('fade-in');
  });
  
  bg2.addEventListener('animationend', e => {
    bg2.classList.remove('fade-out');
  });

  quoteText.addEventListener('animationend', e => {
    quoteText.classList.remove('fade-in');
  });

  getQuoteBtn.addEventListener('click', e => {  
    getNewQuote();
  });
}
