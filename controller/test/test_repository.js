
var assert = require('assert');
var Repository = require('../repository');


describe('Repository', function() {
	
	before(function (done) {
		done();
	});
	
	var repository = new Repository();
	
	
	describe('add Device 433', function () {

		it('id empty',function(done){		
			
			repository.buildNewDevice("433","",function(device,err){
					console.log('Error ->' + err);
					assert.notEqual(err,undefined);
					done();
			});
		});
		
		it('id undef',function(done){		
			
			device = repository.buildNewDevice("433",undefined,function(device,err){
					console.log('Error ->' + err);
					assert.notEqual(err,undefined);
					done();
			});
		});

	
		it('not exists',function(done){		
			var device = repository.getDevice("10100000111001111000");
			
			repository.buildNewDevice("433","10100000111001111000",function(device,err){
					console.log('Build device ');
					console.log(device);
					console.log('Build device with id ->' + device.id);
					assert.notEqual(device,undefined);
					assert.equal(repository.devices.length,1);
					done();
			});
		});
		
		it('exists',function(done){		
			var device = repository.getDevice("10100000111001111000");
			assert.equal(device.id,"10100000111001111000");
			done();
		});
		
		it('exists',function(done){		
			var device = repository.getDevice("10100000111001111000");
			
			repository.buildNewDevice("433",device.id,function(device,err){
				console.log(err);
				done();
			});
			
		});

		
		it('add more',function(done){		
			repository.buildNewDevice("433","101000001110011110001",function(device,err){
					console.log('Build device with id ->' + device.id);
					assert.notEqual(device,undefined);
					assert.equal(device.id,"101000001110011110001");
					assert.equal(repository.devices.length,2);
					done();
			});
		});
		
		it('add more 2',function(done){		
			repository.buildNewDevice("433","101000001110011110011",function(device,err){
					console.log('Build device with id ->' + device.id);
					assert.notEqual(device,undefined);
					assert.equal(device.id,"101000001110011110011");
					assert.equal(repository.devices.length,3);
					done();
			});
		});
	
	});
	

	describe('add Sensor 433', function () {

		it('ok',function(done){		
			
			repository.buildNewDevice("433","444444",function(device,err){
					console.log('Build device with id ->' + device.id);
					assert.notEqual(device,undefined);
					var sensorId = "1";
					repository.addSensor(device.id, sensorId, function(sensor,error){
						assert.notEqual(sensor,undefined);
						done();
					});
			});
		});
		
		it('undef sensor',function(done){		
			
			repository.buildNewDevice("433","444445",function(device,err){
					console.log('Build device with id ->' + device.id);
					assert.notEqual(device,undefined);
					var sensorId = undefined;
					repository.addSensor(device.id, sensorId, function(sensor,error){
						assert.equal(sensor,undefined);
						done();
					});
			});
		});
		
		it('wrong device.id',function(done){		
			
					var sensorId = "1";
					repository.addSensor("15423", sensorId, function(sensor,error){
						assert.equal(sensor,undefined);
						done();
					});
		});
		
		it('duplicate sensor',function(done){		
			
					var sensorId = "1";
					repository.addSensor("444444", sensorId, function(sensor,error){
						assert.equal(sensor,undefined);
						done();
					});
		});



	});
	
/*			
	describe('add Device', function () {
		
		it('not exists',function(done){		
			var device = repository.getDevice(1);
			
			device = repository.buildNewDevice('NRF');
			console.log('Build device with id ->' + device.id);
			assert.notEqual(device,undefined);
			assert.equal(repository.devices.length,1);
			done();
		});
		
		it('exists',function(done){		
			var device = repository.getDevice(1);
			assert.equal(device.id,1);
			done();
		});
		
		it('add more',function(done){		
			device = repository.buildNewDevice();
			assert.equal(device.id,2);
			done();
		});
		
		it('add more 2',function(done){		
			device = repository.buildNewDevice();
			assert.equal(device.id,3);
			done();
		});

	});
*/	
	
	describe('add Event log', function () {
		
		it('add',function(done){		
			var event = {deviceId : 1, sensorId: 0, event : "evento1"}
			var device = repository.addEventLog(event, function(){
				done();
			});
		});
	});


});




