# RMT v0.3

Minimal cryptographic primitive for verifiable claims.

A claim is canonicalized, hashed, signed, bound to an `event_id`, and committed as a Merkle leaf.  
For the genesis event, the Merkle root is the leaf.

## What this repo proves

This repository is only considered valid if the verifier reproduces the same root in:

- Node.js
- Python
- `genesis/root.txt`

If all three match, the genesis claim is reproducible.

---

## Quick Start

```bash
git clone https://github.com/jsonwisdom/RMT
cd RMT

npm install
pip install -r requirements.txt

node scripts/generate.js
chmod +x verifier.sh
./verifier.sh


# RMT v0.3 — Reputation Merkle Tree

RMT is a minimal cryptographic primitive for verifiable attestations.

It works like **Git commits for claims**.

A wallet signs a canonical claim → the claim becomes a deterministic hash → the hash becomes a Merkle leaf → the leaf becomes a root.

If two independent implementations recompute the same root, the claim is proven.

No trust in this repository is required.  
The verifier recomputes everything from the committed bytes.

---

## Primitive
