function buildReport() {
    const html = `
      <h3>OpenResPublica Report</h3>
      <p>Generated: ${new Date().toISOString()}</p>
      <p>Includes: Ledger summary, compliance notes, QR validations.</p>
    `;

    document.getElementById("reportOutput").innerHTML = html;
}
