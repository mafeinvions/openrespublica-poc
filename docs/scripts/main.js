async function generateQR() {
  let id = document.getElementById("docid").value;
  let title = document.getElementById("title").value;
  let issuer = document.getElementById("issuer").value;

  let raw = id + "|" + title + "|" + issuer;
  let hash = await sha256(raw);

  document.getElementById("hashOutput").innerText = hash;

  let qrDiv = document.getElementById("qr");
  qrDiv.innerHTML = "";

  let img = document.createElement("img");
  img.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + hash;

  qrDiv.appendChild(img);
}
