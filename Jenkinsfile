pipeline {
    agent any
    environment {
        img="portus.odds.team/vulcan/vulcan-web/vulcan-web-prod:${BUILD_NUMBER}"
        registry="https://portus.odds.team"
    }
    options {
        ansiColor('xterm')
    }

    stages{
        stage('Download Deps') {
            steps {
                script {
                    sh "docker build -t ${img} --target download ."
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${img} --target builder ."
                }
            }
        }
        stage('Push image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'portus-jenkins', url: registry) {
                        def image = docker.build(img, '.') 
                        image.push()
                    }
                }
            }
        }
        
         stage('Deploy Development') {
             steps {
                withCredentials([
                     sshUserPrivateKey(credentialsId: 'vulcan', keyFileVariable: 'vulcan'),
                     usernamePassword(credentialsId: 'portus-jenkins', usernameVariable: 'docker_user', passwordVariable: 'docker_password'),
                     usernamePassword(credentialsId: 'vulcan-user-variable', usernameVariable: 'vulcan_user', passwordVariable: 'vulcan_password')
                     ]) {
                     sh """
                         ssh -i $vulcan -oStrictHostKeyChecking=no -t ubuntu@vulcan-tts.lab.ai \"
                         docker stop vulcan-web
                         sh /opt/vulcan/scripts/prod/delete-docker-web.sh
                         docker logout portus.odds.team
                         docker login -u $docker_user -p $docker_password portus.odds.team 2>/dev/null
                         docker pull $img
                         docker run --rm -d --name vulcan-web-prod -p 8081:80 $img
                     \"
                     """
                 }
             }
         }
    }
}
