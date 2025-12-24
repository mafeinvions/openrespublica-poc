document.addEventListener("DOMContentLoaded", () => {
    fetch("/openrespublica-poc/src/navbar.html")
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML("afterbegin", html);
      });
});
