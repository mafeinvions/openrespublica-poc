async function verifyIntegrity() {
    const manifest = await fetch("./manifest.json").then(r => r.json());
    const files = manifest.files;

    let passed = true;

    for (const f of files) {
        const res = await fetch(f.path);
        const text = await res.text();
        const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
        const hex = Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, '0')).join('');

        if (hex !== f.sha256) {
            passed = false;
            console.warn("Integrity failed:", f.path);
        }
    }

    return passed;
}
