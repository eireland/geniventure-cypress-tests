const firebase = require('./utilitites/firebase_connection');
const serviceAccount = require('./config/gvstaging-firebase-key.json');
const configStaging = require('./config/firebase-staging-config.json')
const io = require( './utilitites/ITS_socket.js');
const itsServers = require ('./config/its-server-instances.json')

// ITS variables
const instance = "cc_server_staging";
const ITSServer = itsServers[instance];
const authoringVersionNumber = 1;

var socket = null,
    session = "f6c94960-7e25-c2cf-0b4e-f964f2eb20f9",
    classId = '8888',
    userId = '8',
    userQueryString = authoringVersionNumber + "/userState/" + classId + "/" + userId,
    lastActionSequenceId = -1,
    isConnectonEstablished = false,
    msgQueue = [],
    ITS_groupId = "GUIDE-3.10",
    userITSQueryString = authoringVersionNumber + "/userState/" + classId + "/" + userId+"/itsData/studentModel";


// Geni state
var challengeNum = 2, levelNum = 2, missionNum = 2;
var stateMeta = {
    lastActionTime: Date.now(),
    currentChallenge: {challenge: challengeNum, level: levelNum, mission: missionNum}
}

// ITS messages
var sessionStartMsg = {
  "studentId": userId,
  "session": session,
  "sequence": 0,
  "actor": "SYSTEM",
  "action": "STARTED",
  "target": "SESSION",
  "context": {
    "classId": classId,
    "groupId": ITS_groupId,
    "itsDBEndpoint":userQueryString+"/itsData"
  },
  "time": Date.now()
}

var submitIncorrectOrganismMsg = {
    "studentId": userId,
    "session": "f6c94960-7e25-c2cf-0b4e-f964f2eb20f9",
    "sequence": 4,
    "actor": "USER",
    "action": "SUBMITTED",
    "target": "ORGANISM",
    "context": {
      "challengeType": "Sim",
      "challengeId": "allele-targetMatch-visible-simpleDom",
      "species": "Drake",
      "target": {
        "sex": "Female",
        "phenotype": {
          "armor": "One armor",
          "tail": "Kinked tail",
          "forelimbs": "No forelimbs",
          "hindlimbs": "Hindlimbs",
          "horns": "Hornless",
          "nose spike": "No nose spike",
          "wings": "Wings",
          "color": "Ash",
          "health": "Healthy",
          "liveliness": "Alive"
        }
      },
      "selected": {
        "alleles": "a:t,b:Tk,a:M,b:m,a:W,b:w,a:H,b:H,a:C,b:c,a:B,b:b,a:Fl,b:Fl,a:Hl,b:hl,a:A1,b:a,a:D,a:Bog,a:rh",
        "sex": "Male"
      },
      "selectableAttributes": [
        "sex",
        "metallic",
        "wings",
        "forelimbs",
        "armor"
      ],
      "classId": classId,
      "groupId": ITS_groupId,
      "correct": false
    },
    "time": Date.now()
  }

  var submitCorrectOrganismMsg = {
    "studentId": userId,
    "session": "f6c94960-7e25-c2cf-0b4e-f964f2eb20f9",
    "sequence": 4,
    "actor": "USER",
    "action": "SUBMITTED",
    "target": "ORGANISM",
    "context": {
      "challengeType": "Sim",
      "challengeId": "allele-targetMatch-visible-simpleDom",
      "species": "Drake",
      "target": {
        "sex": "Female",
        "phenotype": {
          "armor": "One armor",
          "tail": "Kinked tail",
          "forelimbs": "No forelimbs",
          "hindlimbs": "Hindlimbs",
          "horns": "Hornless",
          "nose spike": "No nose spike",
          "wings": "Wings",
          "color": "Ash",
          "health": "Healthy",
          "liveliness": "Alive"
        }
      },
      "selected": {
        "alleles": "a:t,b:Tk, a:M,b:m, a:W,b:w, a:H,b:H, a:C,b:c, a:B,b:b, a:Fl,b:Fl, a:Hl,b:hl, a:A1,b:a, a:D, a:Bog, a:rh",
        "sex": "Female"
      },
      "selectableAttributes": [
        "sex",
        "wings",
        "forelimbs",
        "hindlimbs"
      ],
      "classId": classId,
      "groupId": ITS_groupId,
      "correct": true
    },
    "time": Date.now()
  }

firebase.firebaseAdminInit(serviceAccount, configStaging.databaseURL);
firebase.firebaseAppInit(configStaging)

var databaseAdmin = firebase.getAdminDatabase();
var userQueryString = authoringVersionNumber + "/userState/" + classId + "/" + userId;
  
// ITS setup
  
  socket = io.initializeITSSocket(ITSServer.url, ITSServer.path, sessionStartMsg)
    
  socket.on('error', data =>
      console.info({type: GUIDE_ERRORED, data})
  );
  
socket.emit('Event', JSON.stringify(submitCorrectOrganismMsg))

//check to see if ITS wrote to Firebase and the correct info is written
firebase.getValue(databaseAdmin, userITSQueryString);
 
socket.emit('Event', JSON.stringify(submitIncorrectOrganismMsg))

firebase.getValue(databaseAdmin, userITSQueryString);
