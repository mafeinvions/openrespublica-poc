async function generateCryptoStamp(data) {
    const enc = new TextEncoder().encode(JSON.stringify(data));
    const hash = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, '0')).join('');
}
