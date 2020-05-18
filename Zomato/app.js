var express=require("express");
var app=express();
//var request=require("request");
const request=require('request-promise');
const cheerio=require('cheerio');

const zomato = require('./zomato');
//app.set('views','Zomato/views');
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("search");
})

app.get("/location",function(req,res){
	var query=req.query.search;
    var url="https://developers.zomato.com/api/v2.1/locations?query="+query+"&apikey=ccfa077c40cc8120e254980fad6adade";
  
	request(url,function(error,response,body){
		if(!error&&response.statusCode==200)
		{
			//var data=JSON.parse(body);
			//res.send(results.Search[0]["Title"]);
		//	res.render("locationid",{data:data});
			res.redirect('/location_details?valid=' + body);
		}
		//var string = encodeURIComponent('something that would break');
  //res.redirect('/location_details?valid=' + string);
	})
})

app.get("/location_details",function(req,res){
	// var query=req.query.search;
	// var query1
	// var url="https://developers.zomato.com/api/v2.1/location_details?entity_id="+query+"&entity_type"+query1+"&apikey=ccfa077c40cc8120e254980fad6adade";
	var body = req.query.valid;
	var data=JSON.parse(body);
	var entity_type=data.location_suggestions[0].entity_type;
	var entity_id=data.location_suggestions[0].entity_id;
	var url="https://developers.zomato.com/api/v2.1/location_details?entity_id="+entity_id+"&entity_type="+entity_type+"&apikey=ccfa077c40cc8120e254980fad6adade";
	request(url,function(error,response,body){
		if(!error&&response.statusCode==200)
		{
			 var data=JSON.parse(body);
			//  var url1=data["best_rated_restaurant"][0]["restaurant"]["url"];
			//  var url2=url1.split("?")[0];
			//  var ord="/order";
			//  var url3=url2.concat(ord);
			//  console.log(url1);
			//  console.log(url2);
			//  console.log(url3);
			// for(var i=0;i<10;i++)
			// {
			//  var url1=data["best_rated_restaurant"][i]["restaurant"]["url"];
			//  var url2=url1.split("?")[0];
			//  var ord="/order";
			//  var url3=url2.concat(ord);
			//  console.log(url1);
			//  console.log(url2);
			//  console.log(url3);

			// }
			let count=0;

			 data["best_rated_restaurant"].forEach(element => {
				 var url1=(element["restaurant"]["url"]);
				//  var url1=element["restaurent"]["url"];
				  count++;
				  var url2=url1.split("?")[0];
				  var ord="/order";
				  var url3=url2.concat(ord);
								  if(count<=5)
								  {
									const zomato = require('./zomato');
									(async () => {
									await zomato.initialize();
									let details = await zomato.getProductDetails(url3);
	
									console.log(details);
	
									await zomato.end();
	
	
									//debugger;
									
									})();

								  }
								

			 });

							// const zomato = require('./zomato');
							// (async () => {
							// await zomato.initialize();
							// let details = await zomato.getProductDetails(url3);

							// console.log(details);

							// await zomato.end();


							// //debugger;
							
							// })();


			 //console.log(data["best_rated_restaurant"]["url"]);
			 res.render("locationdetails",{data:data});
			//var $ = cheerio.load(body);
			 //console.log(data);
			// res.redirect('/restaurent?valid='+body);
			// console.log(data);
			// //res.send("HI");
		}
	})
});

// app.get("/restaurent",function(req,res){
// 	var body=req.query.valid;
// 	//var data=JSON.parse(body);
// 	console.log(body);
// 	res.send("hi");
// })



app.get("/results",function(req,res){
	var query=req.query.search
	var url="https://developers.zomato.com/api/v2.1/cities?q="+query+"&apikey=ccfa077c40cc8120e254980fad6adade";
	request(url,function(error,response,body){
	if(!error&&response.statusCode==200)
		{
			var data=JSON.parse(body);
			//res.send(results.Search[0]["Title"]);
			res.render("results",{data:data});
		}
})
});


app.listen(3000,function(){
	console.log("Zomato app has Started");
})