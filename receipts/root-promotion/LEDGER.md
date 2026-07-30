# Root-Promotion Ledger

## RMT PR #1 — Root Promotion Complete — 2026-07-30

**Canonical Anchor 001:** `jsonwisdom/Welcome-to-JSONWISDOM @ 13004719dd0c34f765ca95dfe8566b6feb2bf6cf`

- SHA-256 root: `ff55160908ff41d23f7af0df8873ef7a0dcf8163d1a308f58941e87b5a95bad9`
- Keccak-256 leaf: `0xb7e55f9e1f4f27cd96f38d74e510e184a14772ef3f9f628d5acc68531dd185d`

**Fault:** `docs/ANCHOR_001_BOUNDARY.md` contained non-canonical segment `...d74e6510e...`.

**Repair:** Squash merge `df12e77ca02844542a391d582646aa350cd521a4` corrected the pointer to canonical `...d74e510e...`. No protected root or sealed corpus was modified.

**Preservation:**

- `receipts/faults/anchor-001-boundary-mismatch-2026-07-29.json`
- `receipts/root-promotion/RMT-PROMO-20260730-0001.json`

**Verification records reported by operator:**

- `RMT-VER-20260730-0001` — external mirror, pre-merge
- `RMT-VERIFIER-20260730-0002` — full root replay, post-merge
- `anchor-001-boundary-20260730-0002` — boundary guard

**Posture:** `YELLOW_STABLE`

> The mistake is now part of the living truth. The anchor is stronger for having survived the fault.
