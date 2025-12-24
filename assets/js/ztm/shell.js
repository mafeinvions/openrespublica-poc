const rules = {
    admin: ["View Ledger","Sign Documents","Access Vault","Generate Reports"],
    auditor: ["View Ledger","Download Audit Trails"],
    public: ["Verify QR","Search Public Documents"]
};

document.getElementById("roleSelect").addEventListener("change", e => {
    const role = e.target.value;
    const div = document.getElementById("result");

    if (!role) return div.innerHTML = "";

    const list = rules[role].map(x => `<li>${x}</li>`).join("");
    div.innerHTML = `<h3>Allowed Actions for ${role.toUpperCase()}</h3><ul>${list}</ul>`;
});
