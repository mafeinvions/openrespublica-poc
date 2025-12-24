async function loadLedger() {
    const chain = document.getElementById('chain');

    chain.innerHTML = "<p>Loading ledger…</p>";

    const files = [
        "OPR-2025-0001.json",
        // Add more as they appear
    ];

    let html = "";

    for (const file of files) {
        const data = await fetch(`../data/${file}`).then(r => r.json());

        html += `
        <div class="chain-item">
            <h3>${data.id}</h3>
            <p>${data.title}</p>
            <p><b>Status:</b> ${data.status || "N/A"}</p>
        </div>`;
    }

    chain.innerHTML = html;
}

loadLedger();
