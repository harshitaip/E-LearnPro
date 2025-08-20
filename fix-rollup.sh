#!/bin/bash
set -e

echo "🔧 Fixing Rollup dependency issue for production deployment..."

# Force install the missing rollup binary
npm install @rollup/rollup-linux-x64-gnu --force --no-save 2>/dev/null || {
    echo "⚠️  Standard install failed, trying alternative approach..."
    
    # Create the rollup directory structure
    mkdir -p node_modules/@rollup/rollup-linux-x64-gnu
    
    # Download and extract the binary manually if needed
    echo "📦 Installing Rollup binary directly..."
    npm install @rollup/rollup-linux-x64-gnu@4.24.0 --force --no-save || true
}

echo "✅ Rollup dependencies fixed!"

# Run the actual build
echo "🚀 Starting build process..."
npm run build
