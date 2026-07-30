# JSONWisdom Forest-State Map

## Operating posture

The forest does not use permanent GREEN. The highest durable posture is `YELLOW_STABLE`: guarded, replayable, and still subject to inspection.

```text
Anchor 001 identity root
  source: jsonwisdom/Welcome-to-JSONWISDOM @ 13004719dd0c34f765ca95dfe8566b6feb2bf6cf
  sha256 root: ff55160908ff41d23f7af0df8873ef7a0dcf8163d1a308f58941e87b5a95bad9
  keccak leaf: 0xb7e55f9e1f4f27cd96f38d74e510e184a14772ef3f9f628d5acc68531dd185d
        |
        | independently verifiable boundary
        v
RMT reputation forest
  pipeline: payload -> canonicalize -> SHA-256 -> event_id/root
  alive check: ./verifier.sh
  boundary guard: node tests/test_anchor_001_boundary.js
        |
        | optional sibling-corpus check
        v
ReceiptOS sealed corpus
  expected local path: $RECEIPTOS_DIR/test-vectors/manifest.json
  absence: NOT_CONFIGURED, never implied PASS
```

## States

- `RED`: known verification failure or canonical mismatch.
- `YELLOW_REPAIR`: fault detected; repair incomplete.
- `YELLOW_SENTINEL_PENDING`: repair merged; required replay not yet observed.
- `YELLOW_STABLE`: required checks passed and receipts preserved.
- `UNKNOWN`: evidence missing or execution not observed.

## Promotion rule

A state transition requires an append-only receipt containing the exact commit, commands, results, and timestamp. Documentation alone cannot promote state.

## Doctrine

> The mistake is canon—not erased. The root remains inviolate. No silent edit. No fake green.
