#!/bin/sh

# Build (requires at least Docker 1.5)
docker build --tag="mmm_dev" --file="DockerfileDev" .

# Run
MMM_URL="http://127.0.0.1:3000"
echo "MMM will soon be available at $MMM_URL"
docker run --detach=false --publish-all=true mmm_dev
