const firebase = require('firebase');
const admin = require('firebase-admin');
// const serviceAccount = require('../config/gvstaging-firebase-key.json');
// const configStaging = require('../config/firebase-staging-config.json')

const CONNECTION_STATUS = {
    online: "online",
    anonymous: "anonymous",
    disconnected: "disconnected"
  };

exports.firebaseAdminInit= function (account, url)  {
    admin.initializeApp({
        credential: admin.credential.cert(account),
        databaseURL: url
    }) 
}

exports.firebaseAppInit = function (config) {
    firebase.initializeApp(config)
}

exports.getAdminDatabase = function(){
    return admin.database();
}

exports.updateDatabase = function(dbAdmin, queryStr, dataUpdate){
    dbAdmin.ref(queryStr).update(dataUpdate, (error, dataUpdate) => {
        if (error) {
          console.error("Error updating user state!", dataUpdate, error);
          currentConnectionState = CONNECTION_STATUS.disconnected;
        } else {
          // we saved successfully - we're online
          currentConnectionState = CONNECTION_STATUS.online;
        }
      });
}

exports.getValue = function(dbAdmin, queryStr) {
  console.log('In firebase.getValue')
    dbAdmin.ref(queryStr).on('value', function(snapshot) {
      console.log('Firebase response: '+JSON.stringify(snapshot.val()));
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      })
}

