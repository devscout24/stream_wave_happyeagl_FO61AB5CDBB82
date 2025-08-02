#!/bin/sh
# Docker development startup script with auto-sync

echo "🚀 Starting Capital H Development Environment in Docker"
echo "=============================================="

# Function to handle package file changes
watch_packages() {
    echo "🔍 Starting package auto-sync watcher..."
    while inotifywait -e modify,create,delete /app/package.json /app/bun.lock 2>/dev/null; do
        echo "📦 Package file changed! Installing dependencies..."
        if bun install; then
            echo "✅ Dependencies installed successfully!"
        else
            echo "❌ Failed to install dependencies"
        fi
        echo ""
    done
}

# Start package watcher in background
watch_packages &
WATCHER_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "🧹 Stopping auto-sync watcher..."
    kill $WATCHER_PID 2>/dev/null
    exit 0
}

# Set trap for cleanup
trap cleanup TERM INT

echo "📦 Installing initial dependencies..."
bun install

echo "⚡ Starting Next.js development server..."
echo "🔄 Auto-sync is running in background"
echo "💡 Just run 'bun add package-name' locally and it will auto-sync!"
echo ""

# Start the development server
exec bun run dev
