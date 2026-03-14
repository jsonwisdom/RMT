# RMT v0.3 — Reputation Merkle Tree

RMT is a minimal cryptographic primitive for verifiable attestations.

It works like **Git commits for claims**.

A wallet signs a canonical claim → the claim becomes a deterministic hash → the hash becomes a Merkle leaf → the leaf becomes a root.

If two independent implementations recompute the same root, the claim is proven.

No trust in this repository is required.  
The verifier recomputes everything from the committed bytes.

---

## Primitive
