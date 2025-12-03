pipeline {
  agent {
    kubernetes {
      label 'docker'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: agent
spec:
  serviceAccountName: jenkins
  containers:
  - name: docker
    image: docker:24-dind
    command:
    - cat
    tty: true
    securityContext:
      privileged: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run
  volumes:
  - name: docker-sock
    emptyDir: {}
"""
    }
  }
  
  environment {
    APP_NAME = 'teaching-platform'
    BUILD_VERSION = "${BUILD_NUMBER}"
  }
  
  stages {
    stage('Checkout') {
      steps {
        echo '📦 Checking out source code...'
        checkout scm
        script {
          env.GIT_COMMIT_SHORT = sh(
            script: "git rev-parse --short HEAD",
            returnStdout: true
          ).trim()
        }
        echo "Git commit: ${GIT_COMMIT_SHORT}"
      }
    }
    
    stage('Build') {
      steps {
        container('docker') {
          echo '🔨 Building Docker image...'
          sh """
            docker build -t ${APP_NAME}:${BUILD_VERSION} .
            docker tag ${APP_NAME}:${BUILD_VERSION} ${APP_NAME}:latest
          """
          echo "✅ Built ${APP_NAME}:${BUILD_VERSION}"
        }
      }
    }
    
    stage('Verify') {
      steps {
        echo '✓ Build completed successfully'
        echo "Image: ${APP_NAME}:${BUILD_VERSION}"
        echo "Commit: ${GIT_COMMIT_SHORT}"
      }
    }
  }
  
  post {
    success {
      echo '✅ Pipeline completed successfully!'
      echo "Built: ${APP_NAME}:${BUILD_VERSION}"
    }
    failure {
      echo '❌ Pipeline failed!'
    }
    always {
      echo '🧹 Cleaning up workspace...'
      cleanWs()
    }
  }
}
