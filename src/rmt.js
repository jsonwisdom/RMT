import canonicalize from 'canonicalize';
import { createHash } from 'crypto';

const sha256 = (data) =>
  createHash('sha256').update(data).digest('hex');

const LEAF_PREFIX = Buffer.from('leaf:');

export function commitClaim(payload, signatureHex) {
  const canonical = canonicalize(payload);
  const payloadHash = sha256(Buffer.from(canonical));

  const payloadBytes = Buffer.from(payloadHash, 'hex');
  const sigBytes = Buffer.from(signatureHex.replace(/^0x/, ''), 'hex');

  const eventId = sha256(Buffer.concat([payloadBytes, sigBytes]));

  const leafData = {
    attestor: payload.attestor,
    resolved_wallet: payload.resolved_wallet,
    artifact_hash: payload.artifact_hash,
    event_type: payload.event_type,
    weight: payload.weight,
    timestamp: payload.timestamp,
    payload_hash: payloadHash,
    signing_scheme: payload.signing_scheme,
    signature: signatureHex.replace(/^0x/, ''),
    event_id: eventId
  };

  const leafCanonical = canonicalize(leafData);

  const root = sha256(
    Buffer.concat([LEAF_PREFIX, Buffer.from(leafCanonical)])
  );

  return { payloadHash, eventId, root };
}
