@echo off
echo Starting Backend API...
start cmd /k "uvicorn backend:app --reload --port 8000"

echo Starting Frontend Server...
cd frontend
start cmd /k "npm run dev"
