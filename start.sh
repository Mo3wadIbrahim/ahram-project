#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Starting development server..."
if which xdg-open > /dev/null
then
  xdg-open http://localhost:5173 &
elif which open > /dev/null
then
  open http://localhost:5173 &
fi
npm run dev
