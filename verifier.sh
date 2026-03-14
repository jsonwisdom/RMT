#!/bin/bash
set -e

echo "Running RMT verifier..."

node scripts/generate.js

ROOT_NODE=$(cat genesis/root.txt)

echo "Root:"
echo $ROOT_NODE

echo "✅ RMT v0.3 IS ALIVE"
