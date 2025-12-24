function generateRecord() {
    const id = "OPR-2025-" + String(Math.floor(Math.random() * 9999)).padStart(4, "0");

    const record = {
        id,
        title: "Auto-Generated Document",
        type: ["Resolution","Certificate","Ordinance"][Math.floor(Math.random()*3)],
        date: new Date().toISOString(),
        issuer: "Barangay Buñao, Dumaguete City",
        hash: crypto.randomUUID(),
        signer: ["Punong Barangay","Barangay Secretary","Barangay Treasurer"][Math.floor(Math.random()*3)],
        status: ["signed","pending","verified"][Math.floor(Math.random()*3)]
    };

    document.getElementById("output").textContent = JSON.stringify(record, null, 2);
}
