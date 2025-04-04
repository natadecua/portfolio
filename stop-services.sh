#!/bin/bash
# filepath: stop-services.sh

# Define ports for the services
PYTHON_PORT=8000
NODE_PORT=4000
REACT_PORT=3001

# Kill the Python HTTP server process
PYTHON_PID=$(lsof -t -i:$PYTHON_PORT)
if [ -n "$PYTHON_PID" ]; then
  echo "Stopping Python HTTP server on port $PYTHON_PORT (PID: $PYTHON_PID)"
  kill -9 $PYTHON_PID
else
  echo "No Python HTTP server running on port $PYTHON_PORT"
fi

# Kill the Node.js server process
NODE_PID=$(lsof -t -i:$NODE_PORT)
if [ -n "$NODE_PID" ]; then
  echo "Stopping Node.js server on port $NODE_PORT (PID: $NODE_PID)"
  kill -9 $NODE_PID
else
  echo "No Node.js server running on port $NODE_PORT"
fi

# Kill the React app process
REACT_PID=$(lsof -t -i:$REACT_PORT)
if [ -n "$REACT_PID" ]; then
  echo "Stopping React app on port $REACT_PORT (PID: $REACT_PID)"
  kill -9 $REACT_PID
else
  echo "No React app running on port $REACT_PORT"
fi

echo "All services have been stopped."