let currentLang = "en";

async function loadLang(lang) {
  const res = await fetch(`lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    let key = el.getAttribute("data-i18n");
    if (data[key]) el.textContent = data[key];
  });

  currentLang = lang;
}
