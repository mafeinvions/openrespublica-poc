async function loadLedger() {
    const res = await fetch("../../data/OPR-2025-0001.json");
    const json = await res.json();

    const table = document.getElementById("ledgerTable");
    table.innerHTML = "<tr><th>ID</th><th>Title</th><th>Date</th><th>Status</th></tr>";

    json.entries.forEach(e => {
        table.innerHTML += `
          <tr>
            <td>${e.id}</td>
            <td>${e.title}</td>
            <td>${e.date}</td>
            <td>${e.status}</td>
          </tr>
        `;
    });
}

function filterLedger() {
    const filter = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#ledgerTable tr");

    rows.forEach((row, i) => {
        if (i === 0) return;
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
}

loadLedger();
