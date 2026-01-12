pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: toolkit
            image: docker:dind
            command: ['sleep']
            args: ['infinity']
            volumeMounts:
            - name: dockersock
              mountPath: /var/run/docker.sock
          volumes:
          - name: dockersock
            hostPath:
              path: /var/run/docker.sock
      '''
    }
  }
  
  environment {
      AWS_ACCOUNT_ID     = '688948287774'
      AWS_DEFAULT_REGION = 'ca-central-1'
      IMAGE_REPO_NAME    = 'teaching-platform'
      IMAGE_TAG          = "${BUILD_NUMBER}"
      REPOSITORY_URI     = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
  }
  
  stages {
    stage('Setup Tools') {
        steps {
            container('toolkit') {
                sh 'apk update && apk add --no-cache aws-cli'
            }
        }
    }
    
    stage('Login to ECR') {
        steps {
            container('toolkit') {
                withCredentials([usernamePassword(credentialsId: 'aws-credentials', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
            }
        }
    }
    
    stage('Build & Push') {
        steps {
            container('toolkit') {
                echo "Building image: ${REPOSITORY_URI}:${IMAGE_TAG}"
                // Build 'latest' and versioned tag
                sh "docker build -t ${REPOSITORY_URI}:latest ."
                sh "docker build -t ${REPOSITORY_URI}:${IMAGE_TAG} ."
                
                echo "Pushing images to ECR..."
                sh "docker push ${REPOSITORY_URI}:latest"
                sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
            }
        }
    }
  }
  
  post {
        success {
            echo "✅ Deployment checks passed! Image pushed to ECR."
        }
        failure {
            echo "❌ Pipeline failed. Please check logs."
        }
    }
}
