

var Node = function(id_in,name_in,sensors_in){
	
	this.id = "";
	this.name = "";
	this.sensors = [];
	
	if(id_in != undefined) this.id = id_in;
	if(name_in != undefined) this.name = name_in;
	if(sensors_in != undefined) this.sensors = sensors_in;
	
}

var Zone = function(){
	
	this.id = "";
	this.name = "";
	this.armed = false;
	this.nodes = [];
	
}

var Repository = function() {
	
	this.nodes = [];
	this.zones = [];
	
	console.log('Repository init');
	
	this.checkForRemoteUpdate();
			
};



Repository.prototype.getNode = function(nodeId){
		
		function exists(element) {
			var ret = false;
			if(nodeId === element.id) ret = true;
			else ret = false;
			return ret;
		};
		
		var node = this.nodes.find(exists);		
		return node;
};

Repository.prototype.getFreeNodeID = function(){
	var nextNodeId = 0;
	for(var i=0, len = this.nodes.length; i < len; i++){
		if(this.nodes[i].id > nextNodeId ) nextNodeId = this.nodes[i].id;
	};	
	return ++nextNodeId;
}

Repository.prototype.buildNewNode = function(){
		
		var nodeId = this.getFreeNodeID();
		var node = new Node(nodeId,"",[]);
		this.nodes.push(node);
		return node;
};




Repository.prototype.addSensorLog = function(node_in){
		
		console.log("Node_in  ->"+node_in);
		
};


Repository.prototype.checkForRemoteUpdate = function(){
	
	console.log('Start remote update');
	var nodesTmp = this.getNodes();
	if(nodesTmp != undefined){
		this.nodes = nodesTmp;
	}
	
	var zonesTmp = this.getNodes();
	if(zonesTmp != undefined){
		this.zones = zonesTmp;
	}
	console.log(this.nodes);
	setTimeout(Repository.prototype.checkForRemoteUpdate.bind(this),10000);
}

Repository.prototype.getNodes = function(){
	return this.nodes;
}

Repository.prototype.getZones = function(){
	
}



Repository.createZone = function(){
	return new Zone();	
}


module.exports = Repository; 





