const io = require( './utilitites/ITS_socket.js');
const itsServers = require ('./config/its-server-instances.json')

// const instance = "production";
// const instance = "staging";
const instance = "cc_server_staging";
const ITSServer = itsServers[instance];

var pingNum=0;

itsSocket = io.initializeITSSocket(ITSServer.url, ITSServer.path,'')
// reconnect(ITSServer.url, ITSServer.path)
io.pingServer(itsSocket);

