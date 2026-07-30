#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const boundaryPath = path.resolve(__dirname, '..', 'docs', 'ANCHOR_001_BOUNDARY.md');
const text = fs.readFileSync(boundaryPath, 'utf8');

const expected = Object.freeze({
  repository: 'jsonwisdom/Welcome-to-JSONWISDOM',
  commit: '13004719dd0c34f765ca95dfe8566b6feb2bf6cf',
  sha256MerkleRoot: 'ff55160908ff41d23f7af0df8873ef7a0dcf8163d1a308f58941e87b5a95bad9',
  keccak256Leaf: '0xb7e55f9e1f4f27cd96f38d74e510e184a14772ef3f9f628d5acc68531dd185d'
});

function extract(label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = text.match(new RegExp(`\\| ${escaped} \\| \\`([^\\`]+)\\` \\|`));
  if (!match) {
    throw new Error(`Missing boundary field: ${label}`);
  }
  return match[1];
}

const observed = {
  repository: extract('Source Repo'),
  commit: extract('Git Commit'),
  sha256MerkleRoot: extract('Merkle Root \\(SHA-256\\)'),
  keccak256Leaf: extract('Leaf Keccak-256')
};

for (const [field, expectedValue] of Object.entries(expected)) {
  const observedValue = observed[field];
  if (observedValue !== expectedValue) {
    console.error(`FAIL ${field}`);
    console.error(`expected: ${expectedValue}`);
    console.error(`observed: ${observedValue}`);
    process.exit(1);
  }
}

if (text.includes('0xb7e55f9e1f4f27cd96f38d74e6510e184a14772ef3f9f628d5acc68531dd185d')) {
  console.error('FAIL stale non-canonical Anchor 001 leaf remains in boundary document');
  process.exit(1);
}

console.log('PASS Anchor 001 boundary matches pinned canonical values');
