
var logger = require('./config/logger.js')('P433');
var Repository = require('./repository.js');

var Protocol_433 = function(repository) {
						
		this.onMsg = function(msg,callback){
			
			if(!msg.startsWith('[')){
				logger.info("msg -> "+msg);
				return;
			}
			
			var decimal = msg.substring(1, (msg.length-2));
			
			var addresscode = (decimal >> 8) & 0xFFFF;
			var commandcode = (decimal & 0xFF);
			
			logger.info("addresscode : "+addresscode+"\t commandcode : "+commandcode);
			
			var device = repository.getDevice(addresscode.toString());
			
			if(device){
				var event = {deviceId : addresscode, sensorId: commandcode, event : "Alarm"}
				repository.addEventLog(event, function(err){
					if(err){
						logger.error(err);
						callback();
					}else {
						logger.info("Event add ok");
						callback();
					}
				});
			}else{
				logger.info("Create new device ...");
				repository.buildNewDevice("433", addresscode, function(device,err){
					if(device){
						logger.info("New device created :");
						logger.info(device);
						
						var sensorId = commandcode;
						repository.addSensor(addresscode, sensorId, function(device, error){
							if(error){ 
								logger.error(error);
								callback();
							} else {
								logger.info("Sensor add ok");
								callback();
							}
						});
						
					}else{
						logger.error(err);
						callback();
					}
				});
			}
		};
};

module.exports = Protocol_433;


