const io = require( './utilitites/ITS_socket.js');
const itsServers = require ('./config/its-server-instances.json')

const instance = "cc_server_staging";
const ITSServer = itsServers[instance];
const authoringVersionNumber = 1;

var socket = null,
    session = "f6c94960-7e25-c2cf-0b4e-f964f2eb20f9",
    classId = '8888',
    userId = '8'
    userQueryString = authoringVersionNumber + "/userState/" + classId + "/" + userId;
    lastActionSequenceId = -1,
    isConnectonEstablished = false,
    msgQueue = [],
    ITS_groupId = "GUIDE-3.10";

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

var navigateMsg = {
  "studentId": userId,
  "session": session,
  "sequence": 0,
  "actor": "USER",
  "action": "NAVIGATED",
  "target": "CHALLENGE",
  "context": {
    "challengeType": "Sim",
    "challengeId": "allele-targetMatch-visible-simpleDom",
    "classId": classId,
    "groupId": ITS_groupId,
    "routeSpec": {
       "level": 2,
       "mission": 1,
       "challenge": 0,
    },
  },
  "time": Date.now()
}


itsSocket = io.initializeITSSocket(ITSServer.url, ITSServer.path, sessionStartMsg)
io.sendMessage(sessionStartMsg,itsSocket)
io.sendMessage(navigateMsg,itsSocket)
