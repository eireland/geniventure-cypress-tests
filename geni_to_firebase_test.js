const firebase = require('./utilitites/firebase_connection');
const serviceAccount = require('./config/gvstaging-firebase-key.json');
const configStaging = require('./config/firebase-staging-config.json')

const authoringVersionNumber = 1;
var classId = 8888, userId=8;
var challengeNum = 1, levelNum = 2, missionNum = 1;
var stateMeta = {
    lastActionTime: Date.now(),
    currentChallenge: {challenge: challengeNum, level: levelNum, mission: missionNum}
}
var databaseAdmin = firebase.getAdminDatabase();
var userQueryString = authoringVersionNumber + "/userState/" + classId + "/" + userId;
var userDataUpdate = {stateMeta: stateMeta}


firebase.firebaseAdminInit(serviceAccount, configStaging.databaseURL)

firebase.updateDatabase(databaseAdmin,userQueryString, userDataUpdate)  

firebase.getValue(databaseAdmin, userQueryString);