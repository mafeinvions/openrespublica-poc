function validate() {
    const input = document.getElementById("jsonInput").value;
    const out = document.getElementById("output");

    try {
        const json = JSON.parse(input);

        const required = ["id","title","type","date","issuer"];

        const missing = required.filter(key => !json[key]);

        if (missing.length > 0) {
            out.textContent = "❌ Missing fields: " + missing.join(", ");
        } else {
            out.textContent = "✔ Metadata is valid.";
        }

    } catch (e) {
        out.textContent = "Invalid JSON.";
    }
}
