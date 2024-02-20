pipeline {
  agent none
  environment {
    ENV = "dev"
    NODE = "worker-node-3"
    CREDS = credentials('duc-docker-hub')
  }
  

  stages {
    stage('Build Image') {
      agent {
        node {
          label "$NODE"
        }
      }

    

      steps {
        script {
          env.TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
        }


        sh "sudo docker build -t devopstest-$ENV:latest ."

        sh "sudo docker images"

        sh "sudo docker login -u dangminhduc -p $CREDS_PSW"

        sh "sudo docker tag devopstest-$ENV:latest dangminhduc/devopstest:$TAG"

        sh "sudo docker push dangminhduc/devopstest:$TAG"

        sh "sudo docker rmi -f dangminhduc/devopstest:$TAG"
        sh "sudo docker rmi -f devopstest-$ENV:latest"
        // sh "echo TAG_DEPLOY=$TAG > .env"
      }
    }

    stage('Deploy') {
      agent {
        node {
          label "worker-node-3"
        }
      }

      steps {
         //sh "sudo sed -i 's|dangminhduc/devopstest:{tag}|dangminhduc/devopstest:$TAG|' deployment.yaml"
         sh "kubectl apply -f deployment.yaml"
         sh "kubectl set image deployment/nodejs-demo-deployment nodejs-demo=dangminhduc/devopstest:$TAG -n duc-nodejs"
      }
    }

    stage('Point domain') {
        sh "kubectl delete -f /home/team1_devops/devops-k8s/ingress/cilium"
        sh "kubectl apply -f /home/team1_devops/devops-k8s/ingress/cilium/duc-nodejs-ingress.yaml"
    }
  }
}