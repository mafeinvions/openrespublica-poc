async function verifyDoc() {
  let id = document.getElementById("lookup").value;

  try {
    const res = await fetch(`data/${id}.json`);
    const json = await res.json();

    let reconstruct = json.id + "|" + json.title + "|" + json.issuer;
    let recomputed = await sha256(reconstruct);

    let pass = (recomputed === json.hash);

    document.getElementById("result").textContent =
      pass ? "VALID DOCUMENT\n\n" + JSON.stringify(json, null, 2)
           : "INVALID — Hash mismatch";

  } catch (e) {
    document.getElementById("result").textContent = "NOT FOUND";
  }
}
