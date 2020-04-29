pipeline {
    agent {
        label 'freebsd&&nodejs'
    }

    environment {
        // Used for tests, to make Jest running all tests without watcher
        NEXUS = "https://colossus.kruemel.home/nexus/"
	    REPOSITORY = "repository/funnel/funnel-frontend/"
    }

    triggers {
        pollSCM '@hourly'
        cron '@daily'
    }

    options {
        ansiColor('xterm')
        timestamps()
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')
    }

    stages {
        stage('clean') {
            steps {
                sh 'rm -rf build node_modules'
            }
        }

        stage('install packages') {
            steps {
                sh 'npm install'
            }
        }

        stage('build') {
            steps {
                sh 'npm build'
            }
        }

        stage('deploy') {
            when {
                branch "release/v*"
                not {
                    triggeredBy "TimerTrigger"
                }
            }

            steps {
                sh 'tar -C build -cvzf funnel-frontend-${BRANCH_NAME#release/v}.tar.gz .'

                withCredentials([usernameColonPassword(credentialsId: '88f4e173-e719-4ded-b54a-ab4a41546886', variable: 'CREDENTIALS')]) {
                    sh 'curl -k -u "$CREDENTIALS" --upload-file funnel-frontend-${BRANCH_NAME#release/v}.tar.gz "${NEXUS}${REPOSITORY}/${BRANCH_NAME#release/v}/"'
                }

                script {
                    def version = env.BRANCH_NAME - 'release/v'
                    step([$class                 : "RundeckNotifier",
                          includeRundeckLogs     : true,
                          jobId                  : "73f61ea8-6c26-4226-b3d8-c566d0c0da67 ",
                          options                : "version=$version",
                          rundeckInstance        : "gizmo",
                          shouldFailTheBuild     : true,
                          shouldWaitForRundeckJob: true,
                          tailLog                : true])
                }
            }
        }
    }


    post {
        always {
            mail to: "rafi@guengel.ch",
                    subject: "${JOB_NAME} (${BRANCH_NAME};${env.BUILD_DISPLAY_NAME}) -- ${currentBuild.currentResult}",
                    body: "Refer to ${currentBuild.absoluteUrl}"
        }
    }
}
