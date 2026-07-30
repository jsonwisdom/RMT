# Anchor 001 — Boundary

## RMT is independent

RMT, Reputation Merkle Tree v0.3, uses its own proof pipeline:

```text
payload → canonicalize → SHA-256 → event_id / root
```

Anchor 001 uses a different pipeline:

```text
RFC 8785 JCS → SHA-256 (Merkle) → Keccak-256 (leaf) → EAS on Base
```

## Canonical Anchor 001

| Field | Value |
|---|---|
| Source Repo | `jsonwisdom/Welcome-to-JSONWISDOM` |
| Git Commit | `13004719dd0c34f765ca95dfe8566b6feb2bf6cf` |
| Merkle Root (SHA-256) | `ff55160908ff41d23f7af0df8873ef7a0dcf8163d1a308f58941e87b5a95bad9` |
| Leaf Keccak-256 | `0xb7e55f9e1f4f27cd96f38d74e510e184a14772ef3f9f628d5acc68531dd185d` |
| EAS Schema UID | `0x3bab210b4da3faff084e146075caf9168efb5c9c87f18509bca2c07d7f2e49c` |
| EAS Attestation UID | `0x18b5b00c62c648df2ccf4a746645493fa2a0b0dcda6697052d8c3a3d1586c142` |
| Chain | Base |
| ENS | `DEFERRED` |

## Relationship

RMT and Anchor 001 are independent proof systems.

RMT roots are not Anchor 001 roots.

Anchor 001 verification should use the canonical source above.

RMT verification should use this repo's own verifier and genesis artifacts.

## Boundary Rule

Do not conflate RMT genesis roots, reputation leaves, or event IDs with Anchor 001 unless a specific cross-reference is committed and independently verifiable.

Rule: no ghost anchor.
