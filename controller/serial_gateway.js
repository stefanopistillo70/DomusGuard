
var serialport = require("serialport");
var logger = require('./logger.js')('SrlGateway');

var serial_gateway = function(protocol, gwPort, gwBaud) {
	
		//var instance;
		//var protocol;
		//var gw;
		
		/*var response = function(data){
			
		}
		*/
		//function init() {
			
			//const gwPort = '\\\\.\\COM10';
			if(gwPort ===undefined) gwPort = '/dev/pts/2';
			if(gwBaud ===undefined) gwBaud = 115200;
		
			var SerialPort = serialport.SerialPort;
			var gw = new SerialPort(gwPort, { baudrate: gwBaud , parser: serialport.parsers.readline("\n")}, false);
		
			gw.open();
			gw.on('open', function() {
				logger.info("connected to serial gateway at " + this.gwPort);
			}).on('data', function(rd) {
				logger.info("RECIEVING ->"+rd.toString());
								
				this.protocol.onMsg(rd,function(msg){
					if(msg) logger.info("Sending response ->"+msg.toString());
					else logger.info("No response to send back");
				});
				
			}).on('end', function() {
				logger.error("disconnected from gateway");
			}).on('error', function(error) {
				logger.error("failed to open: "+error);
				logger.error("trying to reconnect");
				setTimeout(function(){gw.open()}, 5 * 1000);
			});
						
			//return {}
		//};
		
		/*return {
			getInstance: function (protocol) {
		 
			  if ( !instance ) {
				logger.log('info','Initialize Serial Gataway...');
				this.protocol = protocol;
				instance = init();
				logger.log('info','Done'); 
			  }
			  return instance;
			}
		};
 */
};


module.exports = serial_gateway;


