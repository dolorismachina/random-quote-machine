const quoteUrl = 'https://talaikis.com/api/quotes/random/';
const imgAPI = 'https://source.unsplash.com/random/1280x720';

// Element references
const bg1 = document.querySelector('#bg1');
const bg2 = document.querySelector('#bg2');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

addEventListeners();

window.addEventListener('load', getNewQuote());

const getQuoteBtn = document.querySelector('.next-quote');
getQuoteBtn.addEventListener('click', e => {  
  getNewQuote();
});

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

  quoteText.classList.add('fade-in');
}

function fetchBackground() {
  window.fetch(imgAPI)
    .then( res => {
      swapImages(res.url);
      fetchQuote();
    })
    .catch( e => console.error(e) );
}

function getNewQuote() {
  fetchBackground();
}

function swapImages(newImg) {
  const img = new Image();
  img.src = newImg;
  img.onload = e => {
    const imgProp = `url("${newImg}")`;
    const oldImg = document.querySelector('#bg1').style.getPropertyValue('--img');
   
    bg1.style.setProperty('--img', imgProp);
    bg2.style.setProperty('--img', oldImg);
  
    bg1.classList.add('fade-in');
    bg2.classList.add('fade-out');

    img.remove();
  }
}

function addEventListeners() {
  bg1.addEventListener('animationend', e => {
    bg1.classList.remove('fade-in');
  });
  
  bg2.addEventListener('animationend', e => {
    bg2.classList.remove('fade-out');
  });

  quoteText.addEventListener('animationend', e => {
    quoteText.classList.remove('fade-in');
  });
}
