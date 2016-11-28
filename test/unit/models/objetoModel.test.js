var url = 'http://localhost:1337/';
var request = require('supertest')(url);
describe ("product model",function(){
	it("get record from product",function(done){
		var req = request.post("objeto");
		req.send({
			data:{
				
			}
		})
		req.end(function(err,res){
			if(err){
				throw err;
			}
			console.log(res.text);
			done();
		})
		done();
	})
})