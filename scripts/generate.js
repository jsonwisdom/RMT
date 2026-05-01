#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { ethers } from 'ethers';
import canonicalize from 'canonicalize';
import { commitClaim } from '../src/rmt.js';

// DEMO_PRIVATE_KEY — DO NOT USE IN PRODUCTION.
// This deterministic test key exists only so genesis examples are reproducible.
// Real signing keys must be loaded outside this repository and must never be committed.
const DEMO_PRIVATE_KEY = process.env.DEMO_PRIVATE_KEY ||
  '0x0000000000000000000000000000000000000000000000000000000000000001';

const wallet = new ethers.Wallet(DEMO_PRIVATE_KEY);

const payload = {
  schema_version: '0.3',
  attestor: 'jaywisdom.base',
  resolved_wallet: wallet.address.toLowerCase(),
  artifact_hash: '7d8f3e2a1b9c5d4e8f7a6b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e',
  merkle_root: 'abc123def4567890abc123def4567890abc123def4567890abc123def4567890',
  event_type: 'claim',
  weight: 1,
  timestamp: 1712351231,
  chain_id: 8453,
  signing_scheme: 'eip191'
};

const canonical = canonicalize(payload);
const signature = await wallet.signMessage(canonical);

const { event, root } = (() => {
  const { payloadHash, eventId, root } = commitClaim(payload, signature);
  return {
    event: {
      ...payload,
      payload_hash: payloadHash,
      signature: signature.replace(/^0x/, ''),
      event_id: eventId
    },
    root
  };
})();

mkdirSync('genesis', { recursive: true });
writeFileSync('genesis/event.json', JSON.stringify(event, null, 2));
writeFileSync('genesis/root.txt', root);

console.log('✅ Genesis created');
console.log(root);
