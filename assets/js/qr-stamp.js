async function generateStamp() {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return alert("Please select a file.");

    const arrayBuffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hexHash = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    const metadata = {
        version: "OPR-CRYPTOSTAMP-1.0",
        hashed_file: file.name,
        sha256: hexHash,
        issuer: "OpenResPublica Simulation",
        timestamp: new Date().toISOString()
    };

    const qrData = JSON.stringify(metadata);
    const output = document.getElementById("output");
    output.innerHTML = "";

    const qrImg = document.createElement("img");
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      encodeURIComponent(qrData);

    const watermark = document.createElement("div");
    watermark.className = "watermark";
    watermark.innerText = "SIMULATED SIGNATURE ONLY";

    output.appendChild(qrImg);
    output.appendChild(watermark);
}
