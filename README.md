# RMT v0.3 — Reputation Merkle Tree

Minimal cryptographic primitive for verifiable claims.

A claim is canonicalized, hashed, signed, bound to an `event_id`, and committed as a Merkle leaf.

For the genesis event, the Merkle root is the leaf.

RMT is an independent prototype and is not the canonical Anchor 001 verifier. See `docs/ANCHOR_001_BOUNDARY.md` for the current Anchor 001 boundary.

---

## Repository Structure

```text
RMT/
├── README.md
├── src/
├── scripts/
├── genesis/
├── verifier.sh
├── package.json
└── requirements.txt
```

---

## Protocol Alive Condition

Clone the repository and run the verifier:

```bash
git clone https://github.com/jsonwisdom/RMT
cd RMT
npm install
pip install -r requirements.txt
./verifier.sh
```

The verifier currently reproduces the genesis root using the Node.js canonical pipeline.

Multi-language verification, including Python verification, is planned but not yet implemented.

The protocol is alive only if the verifier reproduces the expected root and prints:

```text
✅ RMT v0.3 IS ALIVE
```

---

## Safety Boundary

`scripts/generate.js` uses a deterministic demo private key for reproducible examples only.

Do not use demo keys for production signing.

Real signing keys must remain outside this repository.

---

## License

MIT
