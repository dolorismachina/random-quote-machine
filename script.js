const quoteUrl = 'https://talaikis.com/api/quotes/random/';
const imgAPI = 'https://source.unsplash.com/random/1280x720';

window.addEventListener('load', fetchQuote());

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
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');
  
  quoteText.textContent = `"${quoteData.quote}"`;
  quoteAuthor.textContent = quoteData.author;
}

function fetchBackground() {
  window.fetch(imgAPI)
    .then( res => {
      const imgProp = `url("${res.url}")`;
      console.log(imgProp);
      document.querySelector('.container').style.setProperty('--img', imgProp);

      fetchQuote();
    })
    .catch( e => console.log(e) );
}

function getNewQuote() {
  fetchBackground();
}