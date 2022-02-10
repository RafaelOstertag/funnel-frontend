pipeline {
  agent {
    label 'freebsd&&nodejs'
  }

  environment {
    // Used for tests, to make Jest running all tests without watcher
    NEXUS = "https://colossus.kruemel.home/nexus/"
    REPOSITORY = "repository/funnel/funnel-frontend/"
    VERSION = sh returnStdout: true, script: 'jq -r .version package.json | tr -d \'\\n\''
  }

  triggers {
    pollSCM '@hourly'
    cron '@daily'
  }

  options {
    ansiColor('xterm')
    timestamps()
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '15')
    disableConcurrentBuilds()
  }

  stages {
    stage('install packages') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh 'npm run-script build'
      }
    }

    stage('verify version') {
      when {
        branch "master"
        not {
          triggeredBy "TimerTrigger"
        }
      }

      steps {
        withCredentials([usernameColonPassword(credentialsId: '88f4e173-e719-4ded-b54a-ab4a41546886', variable: 'CREDENTIALS')]) {
          sh '''
if curl -f -k -u "$CREDENTIALS" -I "${NEXUS}${REPOSITORY}/${VERSION}/funnel-frontend-${VERSION}.tar.gz" >/dev/null
then
  echo "### Version ${VERSION} already exists in repository" >&2
  exit 1
else
  echo "Version ${VERSION} not found in repository. Good!"
fi
'''
        }
      }
    }

    stage('publish to repo') {
      when {
        branch "master"
        not {
          triggeredBy "TimerTrigger"
        }
      }

      steps {
        sh 'tar -C dist/funnel-frontend -cvzf funnel-frontend-${BRANCH_NAME#release/v}.tar.gz .'

        withCredentials([usernameColonPassword(credentialsId: '88f4e173-e719-4ded-b54a-ab4a41546886', variable: 'CREDENTIALS')]) {
          sh 'curl -k -u "$CREDENTIALS" --upload-file funnel-frontend-${VERSION}.tar.gz "${NEXUS}${REPOSITORY}/${VERSION}/"'
        }
      }
    }

    stage('deploy') {
      when {
        branch "master"
        not {
          triggeredBy "TimerTrigger"
        }
      }

      steps {
        script {
          def version = env.VERSION
          step([$class                 : "RundeckNotifier",
                includeRundeckLogs     : true,
                jobId                  : "73f61ea8-6c26-4226-b3d8-c566d0c0da67",
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
    unsuccessful {
      mail to: "rafi@guengel.ch",
        subject: "${JOB_NAME} (${BRANCH_NAME};${env.BUILD_DISPLAY_NAME}) -- ${currentBuild.currentResult}",
        body: "Refer to ${currentBuild.absoluteUrl}"
    }
  }
}
