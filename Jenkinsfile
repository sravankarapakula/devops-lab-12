pipeline {
    agent any

    environment {
        IMAGE = 'nandanreddy2102/nodejs-bluegreen-lab12:latest'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE% .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'echo %DOCKER_PASS%| docker login -u %DOCKER_USER% --password-stdin'
                    bat 'docker push %IMAGE%'
                    bat 'docker logout'
                }
            }
        }

        stage('Deploy Green') {
            steps {
                bat '''
                docker rm -f nodejs-green 2>nul
                docker run -d -p 3002:3000 --name=nodejs-green -e APP_VERSION=Green %IMAGE%
                '''
            }
        }

        stage('Test Green') {
            steps {
                bat 'powershell -Command "(Invoke-WebRequest -UseBasicParsing http://localhost:3002/status).Content"'
            }
        }

        stage('Switch to Green') {
            steps {
                bat '''
                docker rm -f nodejs-blue 2>nul
                docker run -d -p 3001:3000 --name=nodejs-blue -e APP_VERSION=Green %IMAGE%
                '''
            }
        }
    }
}