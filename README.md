# R# RMT v0.3 — Reputation Merkle Tree

Minimal cryptographic primitive for verifiable claims.

A claim is canonicalized, hashed, signed, bound to an `event_id`, and committed as a Merkle leaf.

For the genesis event, the Merkle root is the leaf.

---

## Repository Structure

RMT/
├── README.md
├── src/
├── scripts/
├── genesis/
├── verifier.sh
├── package.json
└── requirements.txt

---

## Protocol Alive Condition

Clone the repository and run the verifier:

git clone https://github.com/jsonwisdom/RMT
cd RMT
npm install
pip install -r requirements.txt
./verifier.sh

The protocol is alive only if the verifier reproduces the same root across:

• Node  
• Python  
• genesis/root.txt  

and prints:

✅ RMT v0.3 IS ALIVE

---

## License

MITMT
