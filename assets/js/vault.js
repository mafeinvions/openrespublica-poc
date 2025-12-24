function saveVault() {
    const data = document.getElementById("vaultData").value;
    localStorage.setItem("opr_vault", data);
    alert("Saved locally.");
}

function loadVault() {
    const data = localStorage.getItem("opr_vault") || "";
    document.getElementById("vaultData").value = data;
}

function clearVault() {
    localStorage.removeItem("opr_vault");
    alert("Vault cleared.");
}
