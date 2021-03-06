
var jwtSimple = require('jwt-simple');
var uuid = require('node-uuid');

var secret = 'secret-pwd';
var duration_time = 3600000;



var jwt = {
	getJWT : function(user, refresh, audience, role){
		
		var expire_at = new Date().getTime()+duration_time;
		var access_token = jwtSimple.encode({
			jti : uuid.v4(),
			sub : user,
			aud : audience,
			iss: "account.domusguard.com",
			exp: expire_at,
			role: role
		}, secret);

		if(refresh){
			var refresh_token = jwtSimple.encode({
				jti : uuid.v4(),
				sub : user,
				aud : audience,
				iss: "account.domusguard.com",
				exp: 0,
				role: role
			}, secret);
			
			return { access_token: access_token, expire_at: expire_at, duration_time: duration_time, refresh_token: refresh_token};
		}else{
			return { access_token: access_token, expire_at: expire_at, duration_time: duration_time};
		}
	},

	verifyJWT : function(token, sub){
		var decoded = jwtSimple.decode(token, secret);
//console.log(decoded);
		var now = new Date().getTime();
		if ((sub === decoded.sub) && (decoded.iss === "account.domusguard.com") && ((decoded.exp == 0) || ((decoded.exp - now) > 0 )) ) return true;
		else return false
	},
	
	getInfo : function(token){
		var decoded = jwtSimple.decode(token, secret);
		return { aud : decoded.aud, role : decoded.role};
	}
}



module.exports = jwt;