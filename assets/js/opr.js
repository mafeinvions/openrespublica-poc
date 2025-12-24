async function loadLang(lang) {
    const res = await fetch("../../src/i18n.json");
    const dict = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = dict[lang][key];
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadLang("en");
});
