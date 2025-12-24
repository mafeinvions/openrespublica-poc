function addQRWatermark(text) {
    const canvas = document.createElement("canvas");
    new QRCode(canvas, { text: text, width: 80, height: 80 });

    canvas.style.position = "fixed";
    canvas.style.bottom = "15px";
    canvas.style.right = "15px";
    canvas.style.opacity = 0.3;

    document.body.appendChild(canvas);
}

document.addEventListener("DOMContentLoaded", () => {
    addQRWatermark("OpenResPublica • Integrity Seal");
});
