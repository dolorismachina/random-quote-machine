const quoteUrl = 'https://talaikis.com/api/quotes/random/';
const imgAPI = 'https://source.unsplash.com/random/1280x720';
const twitterURL = 'https://twitter.com/intent/tweet?text=';

// Element references
const bg1 = document.querySelector('#bg1');
const bg2 = document.querySelector('#bg2');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const twitterLink = document.querySelector('#twitter-share');
const getQuoteBtn = document.querySelector('.next-quote');

let backgroundImageBuffer = null;
backgroundImageBuffer = bufferBackground();

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
  const oldImg = bg1.style.getPropertyValue('--img');
 
  bg1.style.setProperty('--img', imgProp);
  bg2.style.setProperty('--img', oldImg);

  addAnimation('fade-in', bg1, bg2);

  backgroundImageBuffer = bufferBackground();
}

function addAnimation(animationName = '', ...targets) {
  targets.forEach(target => target.classList.add(animationName));
}

function removeAnimation(animationName, ...targets) {
  targets.forEach(target => target.classList.remove(animationName));
}

function bufferBackground() {
  if (backgroundImageBuffer) {
    backgroundImageBuffer.remove()
  }

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
    removeAnimation('fade-in', bg1)
  });
  
  bg2.addEventListener('animationend', e => {
    removeAnimation('fade-out', bg2);
  });

  quoteText.addEventListener('animationend', e => {
    removeAnimation('fade-in', quoteText);
  });

  getQuoteBtn.addEventListener('click', e => {  
    getNewQuote();
  });
}
