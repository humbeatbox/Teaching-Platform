pipeline {
  agent any
  
  stages {
    stage('Hello') {
      steps {
        echo '👋 Hello from Jenkins!'
        echo "Build Number: ${BUILD_NUMBER}"
        sh 'pwd'
        sh 'ls -la'
      }
    }
    
    stage('Test') {
      steps {
        echo '✅ Pipeline is working!'
      }
    }
  }
  
  post {
    success {
      echo '🎉 Build succeeded!'
    }
    failure {
      echo '❌ Build failed!'
    }
  }
}
