const quoteUrl = 'https://talaikis.com/api/quotes/random/';
const imgAPI = 'https://source.unsplash.com/random/1280x720';

window.addEventListener('load', fetchQuote());
// Element references
const bg1 = document.querySelector('#bg1');
const bg2 = document.querySelector('#bg2');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

addEventListeners();


const getQuoteBtn = document.querySelector('.next-quote');
getQuoteBtn.addEventListener('click', e => {
  getNewQuote();
});

function fetchQuote() {
  window.fetch(quoteUrl)
    .then(res =>  res.json())
    .then(json => {
      injectQuote(json);
  });
}

function injectQuote(quoteData) {
  console.log('fetch')
  quoteText.textContent = `"${quoteData.quote}"`;
  quoteAuthor.textContent = quoteData.author;

  quoteText.classList.add('fade-in');
}

function fetchBackground() {
  window.fetch(imgAPI)
    .then( res => {
      const imgProp = `url("${res.url}")`;
      swapImages(imgProp);

      fetchQuote();
    })
    .catch( e => console.log(e) );
}

function getNewQuote() {
  fetchBackground();
}
function swapImages(newImg) {
  
  const oldImg = document.querySelector('#bg1').style.getPropertyValue('--img');
  
  bg2.style.setProperty('--img', oldImg);
  bg1.style.setProperty('--img', newImg);

  bg1.classList.add('fade-in');
  bg2.classList.add('fade-out');

  
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
