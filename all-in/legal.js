// Shows one language at a time. Without JavaScript both articles stay visible, English first.
// ?lang=ar opens in Arabic; otherwise the last choice, then the browser language.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  function stored() {
    try { return localStorage.getItem('allin.lang'); } catch (e) { return null; }
  }
  function remember(lang) {
    try { localStorage.setItem('allin.lang', lang); } catch (e) {}
  }
  function apply(lang) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    var articles = document.querySelectorAll('article[lang]');
    for (var i = 0; i < articles.length; i++) articles[i].hidden = articles[i].lang !== lang;
    var buttons = document.querySelectorAll('[data-lang]');
    for (var j = 0; j < buttons.length; j++) buttons[j].setAttribute('aria-pressed', String(buttons[j].getAttribute('data-lang') === lang));
  }
  var query = null;
  try { query = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  var lang = query === 'ar' || query === 'en' ? query
    : stored() || ((navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en');
  apply(lang);
  var buttons = document.querySelectorAll('[data-lang]');
  for (var k = 0; k < buttons.length; k++) buttons[k].addEventListener('click', function (event) {
    var chosen = event.currentTarget.getAttribute('data-lang');
    remember(chosen);
    apply(chosen);
  });
})();
