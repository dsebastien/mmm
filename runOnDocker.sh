#!/bin/sh

# Build
docker build --tag="mmm" .

# Run
containerId=$(docker run --detach=true --publish-all=true mmm)
PORT=$(docker port $containerId 8080 | awk -F: '{print $2}')
MMM_URL="http://127.0.0.1:$PORT"
echo "Up and running over at $MMM_URL (note that if you're on Windows, the IP is not that one, you'll have to figure out the IP of the Docker VM)"
echo "Once you're done, don't forget to stop the container by issuing the following command: 'docker kill $containerId'."