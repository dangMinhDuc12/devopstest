pipeline {
  agent none
  environment {
    ENV = "dev"
    NODE = "Jenkin-build-test"
    TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
  }
  

  stages {
    stage('Build Image') {
      agent {
        node {
          label "$NODE"
        }
      }



      steps {
        sh "docker build -t devopstest-$ENV:latest ."

        sh "docker images"

        sh "cat docker.txt | docker login -u dangminhduc --password-stdin"

        sh "docker tag devopstest-$ENV:latest dangminhduc/devopstest:$TAG"

        sh "docker push dangminhduc/devopstest:$TAG"

        sh "docker rmi -f dangminhduc/devopstest:$TAG"
        sh "docker rmi -f devopstest-$ENV:latest"
      }
    }

    stage('Deploy') {
      agent {
        node {
          label "Jenkin-build-test-deploy"
        }
      }

      steps {
        sh "echo test"
      }
    }
  }
}