const io = require( 'socket.io-client');
const uuid = require('uuid');

var socket = null;

// const sessionID = uuid.v4();

var socket = null;


const GUIDE_CONNECTED = "Guide connected";
const GUIDE_ERRORED = "Guide errored";
const GUIDE_TIMEOUT = "Guide timed out";
    
exports.initializeITSSocket = function(guideServer, socketPath, message) {

    socket = io(guideServer, {
        path: socketPath,
        reconnection: true
    });
    
      socket.on('connect', data => {
        console.info({type: GUIDE_CONNECTED});
        session = 'connected';
        // sendMessage(message,socket)
      });
    
      socket.on('Event', function(data){
        console.info('receiveITSEvent data: '+data)
      }); 
    
      socket.on('error', data =>
        console.info({type: GUIDE_ERRORED, data})
      );
      socket.on('connect_error', data =>
        console.info({type: GUIDE_ERRORED, data})
      );
      socket.on('reconnect_error', data =>
        console.info({type: GUIDE_ERRORED, data})
      ); 
      socket.on('connect_timeout', data =>
        console.info({type: GUIDE_TIMEOUT} )
      ); 
      socket.on('disconnect', (reason) => {
        if ((reason === 'io server disconnect') || (reason === 'ping timeout')) {
          // the disconnection was initiated by the server, you need to reconnect manually
          // socket.connect();
        }
        // else the socket will automatically try to reconnect
        else {
          console.log('User disconnected')
        }
      });

      return socket;
  }

exports.sendMessage = function(message, ksocket){
  console.log("in io.sendMessage");
    ksocket.emit('Event', JSON.stringify(message));
}

exports.pingServer = function(ksocket){
  console.log('in pingServer');
  var pongNum=1;
  ksocket.emit('ping', heartbeat);
  ksocket.on('pong', data=>{
      console.info('pong received',data, pongNum)
      pongNum++
      if (pongNum>=3) {
        ksocket.close();
      }
  })

}

function heartbeat() {
  console.log(response)
  // Use `WebSocket#terminate()` and not `WebSocket#close()`. Delay should be
  // equal to the interval at which your server sends out pings plus a
  // conservative assumption of the latency.
  // this.pingTimeout = setTimeout(() => {
  //   this.terminate();
  // }, 25000 + 5000);
}

exports.reconnect = function(url, path ){
  initializeITSSocket(url, path) 
}

exports.disconnect = function() {
  socket.close();
}