#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

RUN_ID="${RUN_ID:-RMT-SENTINEL-$(date -u +%Y%m%dT%H%M%SZ)}"
OUT_DIR="${OUT_DIR:-receipts/sentinel-runs}"
RECEIPTOS_DIR="${RECEIPTOS_DIR:-}"
mkdir -p "$OUT_DIR"

BOUNDARY_STATUS="NOT_RUN"
RMT_STATUS="NOT_RUN"
RECEIPTOS_STATUS="NOT_CONFIGURED"
EXIT_CODE=0

run_step() {
  local status_var="$1"
  local label="$2"
  shift 2
  echo "==> $label"
  if "$@"; then
    printf -v "$status_var" '%s' "PASS"
  else
    printf -v "$status_var" '%s' "FAIL"
    EXIT_CODE=1
  fi
}

run_step BOUNDARY_STATUS "Anchor 001 boundary guard" node tests/test_anchor_001_boundary.js
run_step RMT_STATUS "RMT full replay" ./verifier.sh

if [[ -n "$RECEIPTOS_DIR" ]]; then
  echo "==> ReceiptOS sealed manifest check"
  if [[ -f "$RECEIPTOS_DIR/test-vectors/manifest.json" ]]; then
    RECEIPTOS_STATUS="PASS"
  else
    RECEIPTOS_STATUS="FAIL"
    EXIT_CODE=1
  fi
fi

GIT_COMMIT="$(git rev-parse HEAD 2>/dev/null || printf 'UNKNOWN')"
TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RECEIPT="$OUT_DIR/${RUN_ID}.json"
OVERALL="PASS"
[[ $EXIT_CODE -ne 0 ]] && OVERALL="FAIL"

cat > "$RECEIPT" <<JSON
{
  "receipt_id": "$RUN_ID",
  "artifact_type": "sentinel_replay_receipt",
  "timestamp_utc": "$TIMESTAMP",
  "repository": "jsonwisdom/RMT",
  "git_commit": "$GIT_COMMIT",
  "checks": {
    "anchor_001_boundary_guard": "$BOUNDARY_STATUS",
    "rmt_full_replay": "$RMT_STATUS",
    "receiptos_sealed_manifest": "$RECEIPTOS_STATUS"
  },
  "overall": "$OVERALL",
  "forest_posture": "YELLOW_STABLE",
  "doctrine": "No silent edit. No fake green."
}
JSON

printf 'Receipt: %s\n' "$RECEIPT"
exit "$EXIT_CODE"
