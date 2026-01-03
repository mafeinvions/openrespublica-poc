# openrespublica-poc
OpenResPublica — A transparency-first, community-governance platform delivering public service innovation through open-source civic technology. This repository hosts the Proof-of-Concept version.


## Proofs and verification

Purpose
- Each published document in /docs/ is accompanied by a small proof bundle so verifiers can confirm the document's integrity and origin without any server-side logic.

Files per document
- docs/<filename> — the published document (PDF, JSON, etc.)
- docs/<filename>.proof.json — proof metadata (see schema below)
- docs/<filename>.proof.json.asc — ASCII-armored detached OpenPGP signature of the proof.json
- keys/issuer.pub.asc — issuer's ASCII-armored OpenPGP public key (canonical location)

Minimal proof.json (recommended fields)
```
{
  "schema": "https://openrespublica.example/schema/proof-v1.json",
  "doc_url": "/docs/contract.pdf",
  "doc_sha256": "sha256:<hex-lowercase>",
  "hash_algo": "sha256",
  "issued_by": "did:web:example.gov#key-1",
  "issuer_pub_key_url": "/keys/issuer.pub.asc",
  "signed_by_commit": "<git-commit-sha>",
  "timestamp": "YYYY-MM-DDTHH:MM:SSZ",
  "anchor": {
    "type": "git",
    "repo": "owner/repo",
    "commit_url": "https://github.com/owner/repo/commit/<sha>"
  }
}
```
Notes:
- doc_sha256: lower-case hex of the SHA‑256 digest of the raw document bytes; prefixing with "sha256:" is allowed but not required for parsing.
- issuer_pub_key_url: canonical URL where the verifier can fetch the issuer's OpenPGP public key (recommended path: /keys/issuer.pub.asc).
- signed_by_commit: include the repository commit SHA that added the proof.json (helps independent verification via GitHub's commit.signature verification).

How signatures are produced
- The proof.json file must be signed using the issuer's private OpenPGP key as a detached ASCII-armored signature:
  - gpg --armor --detach-sign docs/<filename>.proof.json
- Commit the proof.json and its .asc signature to the repo so the proof is discoverable from the static site.

Where to place issuer.pub.asc
- Put the issuer's ASCII-armored public key at: /keys/issuer.pub.asc (URL: https://<your-site>/keys/issuer.pub.asc)
- The verification widget fetches this URL to validate the detached signature.
- Keep this file read-only and stable; publish any key-rotation or revocation info alongside it (see below).

Key rotation and revocation
- Publish revocations or replacements at /keys/revoked.json or /keys/rotation.json with fingerprints and effective timestamps.
- The verifier should check that the issuer key fingerprint is not listed as revoked.

Verification notes (user-facing)
- Verifiers should:
  1. Download the document and compute SHA‑256 of the raw bytes.
  2. Confirm the computed digest matches doc_sha256 in the proof.json.
  3. Fetch issuer.pub.asc and verify docs/<filename>.proof.json.asc verifies the proof.json content (OpenPGP detached signature).
  4. Optionally, verify signed_by_commit via the repository commit endpoint (GitHub's API includes commit.verification).
- If any check fails, treat the document as tampered/untrusted.

Example conventions & UX tips
- proof.json.asc naming: keep the detached signature at docs/<filename>.proof.json.asc for the verification widget to find it automatically.
- Publishing workflow: use CI (GitHub Actions) to compute SHA-256, create proof.json, sign it (via KMS or GPG), and commit the proof artifacts.
- Canonicalization: ensure the CI produces proof.json with stable formatting (consistent key order, no extra timestamps except the timestamp field) so detached signatures remain valid.
