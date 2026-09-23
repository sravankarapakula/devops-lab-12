# Lab Exercise 11 – Node.js REST API CI/CD

## Objective
Develop a REST API using Node.js with a `/status` endpoint, containerize it using Docker, and automate deployment using Jenkins.

## Architecture
GitHub → Jenkins → Docker Build → nodejs-api → nodejs-container → Node.js REST API

## Project Structure
NodeJS_CICD_Lab11/
├── server.js
├── package.json
├── Dockerfile
├── Jenkinsfile
├── .dockerignore
├── .gitignore
└── README.md

## Run Locally
npm install
npm start

Open:
http://localhost:3000/status

Expected response:
{
  "status": "API is running successfully",
  "service": "NodeJS CI/CD REST API"
}

## Docker
docker build -t nodejs-api .
docker run -d -p 3000:3000 --name=nodejs-container nodejs-api

Then open:
http://localhost:3000/status

## Jenkins Freestyle Build Commands
docker rm --force nodejs-container || exit /b 0
docker build -t nodejs-api .
docker run -d -p 3000:3000 --name=nodejs-container nodejs-api

## Git
git init
git branch -M main
git add .
git commit -m "Initial NodeJS CI/CD application"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
