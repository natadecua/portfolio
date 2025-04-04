#!/bin/bash
# filepath: run-all.sh

# Start Python HTTP server
echo "Starting Python HTTP server..."
cd python-server
python3 -m http.server 8000 &
PYTHON_PID=$!
echo "Python HTTP server started on port 8000 (PID: $PYTHON_PID)"
cd ..

# Start Node.js server
echo "Starting Node.js server..."
cd server
npm start &
NODE_PID=$!
echo "Node.js server started on port 4000 (PID: $NODE_PID)"
cd ..

# Start React app
echo "Starting React app..."
cd react
npm start &
REACT_PID=$!
echo "React app started on port 3001 (PID: $REACT_PID)"
cd ..

# Open the website in the default browser
xdg-open http://localhost:8000

# Wait for user to terminate
echo "Services started. Press Ctrl+C to stop."
wait $PYTHON_PID $NODE_PID $REACT_PID