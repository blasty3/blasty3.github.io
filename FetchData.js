
//requirejs([],

var tempPA={};
var tempSC={};
var tempOSM={};
var tempSSant={};
var tempDweet={};


var cndTh = {};
var cndThLoc = {};
var cndThDtStreams = {};
//var cndTh = new Map();
//var cndThLoc = new Map();

    function fetchData() {
    	
		//var checkBoxPA = document.getElementById("purpleaircheckbox");
		//var checkBoxSC = document.getElementById("smartcitizencheckbox");
		//var checkBoxTS = document.getElementById("thingspeakcheckbox");
		
				// Purple Air . SHould be careful with this since the data is owned by them, there should be a clear license for user
			 /*
				  var url = "https://www.purpleair.com/json";
				 
				  // For GET method, API parameters will be sent in the URL. 
				  // Start with an object containing name / value tuples.
				  var apiParams = {
				    // Relevant parameters would go here
				    "fetchData" : "true",
				    "minimize" : "true",
				    "sensorsActive2" : 10080
				  };
			 
				  var encParams = toHtmlQuery_(apiParams);
				  
				 fetch(url+encParams).then(function(response) {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					
					return response;})
					.then((response) => response.json())
				 .then(function(data){
					//console.log("data:" +JSON.stringify(data));
					tempPA = clone(data);
					console.log(tempPA);
				 })
				
				 */

				 // smartcitizen

			 var url = "https://api.smartcitizen.me/v0/devices/world_map";
			
			 fetch(url).then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempSC = clone(data);
				console.log(tempSC);
			 }) 
			 
			 // OpenSenseMap

			 var url = "https://api.opensensemap.org/boxes";
			
			 fetch(url).then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempOSM = clone(data);
				console.log(tempOSM);
			 })

			 //Canada smart cities
			 //canadian cities to query

			 var cndCityParams = ['calgary','edmonton','kamloops','kluanelake','montreal','ottawa','stalbert','victoria','winnipeg','yellowknife'];
				
			 // get all things

			 var urlhttp = "https://";
			 var nexturl = "-aq-sta.sensorup.com/v1.0/Things";
			
			 for(i = 0; i < cndCityParams.length; i++){

				fetch(urlhttp+cndCityParams[i]+nexturl).then(function(response) {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response;})
					.then((response) => response.json())
				 		.then(function(data){

						var cityname = data.value[0].properties.city;
						//cndTh.set(data.value[0].properties.city,data);
						cndTh[cityname] = clone(data);
						console.log(cndTh);

					    //prepare for datastreams
						cndThDtStreams[cityname] = {};

						// get locations of the things in each city

						cndThLoc[cityname] = {};
						var datCpy = clone(data);
						

						for(i = 0; i < datCpy.value.length; i++){

							var url = datCpy.value[i]["Locations@iot.navigationLink"];

								fetch(url).then(function(response) {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response;})
									.then((response) => response.json())
										.then(function(data){
											var iot_id = data.value[0]["@iot.id"];

											cndThLoc[cityname][iot_id] = clone(data.value[0].location.coordinates);
											console.log(cndThLoc);
	
										})
								}

						// get datastreams of individual sensors of each things in each city

						for(i = 0; i < datCpy.value.length; i++){

							FetchDatastreamsCanada(datCpy.value[i],cityname);

							
							
						}


						

				 })
			 }

			

			 //Dweet (public ones), simply get the ones with GPS locations for pinpointing, the rest will be ignored

			 var url = "https://dweet.io/get/stats"; //get the most recent tweets from devices
			
			 fetch(url).then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempDweet = clone(data);
				console.log(tempDweet);
			 })

			  //Smart Santander
			 
			 var url = "https://cors.io/?http://maps.smartsantander.eu/php/getdata.php";
			
			 fetch(url).then(function(response) {
				if (!response.ok) {
					throw Error("error"+response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempSSant = clone(data);
				console.log(tempSSant);
			 })
			 
			 // Some Thingspeak public channels

			 // List are here :  https://api.thingspeak.com/channels/public.json
			
			
			 //  Smart Emission Nijmegen Project


		  
		 
    }

	function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+"="+encodeURIComponent(obj[k]));return a},[]).join("&")};

	//check for empty JSON
	function isEmpty(obj) {
		for (var x in obj) { if (obj.hasOwnProperty(x))  return false; }
		return true;
	 }


	function clone(obj) {
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;
	
		// Handle Date
		if (obj instanceof Date) {
			var copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}
	
		// Handle Array
		if (obj instanceof Array) {
			var copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = clone(obj[i]);
			}
			return copy;
		}
	
		// Handle Object
		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
			}
			return copy;
		}
	
		throw new Error("Unable to copy obj! Its type isn't supported.");
	}

	function FetchDatastreamsCanada(datCpy_val_i, cityName){

		var datastreams_url = datCpy_val_i["Datastreams@iot.navigationLink"];
		var iot_id = datCpy_val_i["@iot.id"];
		cndThDtStreams[cityName][iot_id] = {};

								fetch(datastreams_url).then(function(response) {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response;})
									.then((response) => response.json())
										.then(function(data){

												var sensor_datastreams_arr = clone(data.value);
												
												for(j = 0 ; j < sensor_datastreams_arr.length ; j++){

													FetchObservationsCanada(cityName,iot_id, sensor_datastreams_arr[j]);
													
												}

										})


	}

	function FetchObservationsCanada(cityName, iot_ID, sensor_datastreams){

		var sensor_id = sensor_datastreams["@iot.id"];
		var sensor_type = sensor_datastreams.description;
		var sensor_unitMeasurement = clone(sensor_datastreams.unitOfMeasurement);

		cndThDtStreams[cityName][iot_ID][sensor_id] = {};

		// get "observations" (sensor measurements) of individual sensors of each things in each city

		var obs_url = (sensor_datastreams["Observations@iot.navigationLink"]); // get historical data

		fetch(obs_url+"?$top=2000").then(function(response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;})
			.then((response) => response.json())
				.then(function(data){
					
					cndThDtStreams[cityName][iot_ID][sensor_id].measurements = data.value; // the latest measurement will be on the the first element of the array
					cndThDtStreams[cityName][iot_ID][sensor_id].sensortype = sensor_type;
					cndThDtStreams[cityName][iot_ID][sensor_id].sensor_unitMeasurement = sensor_unitMeasurement;
					console.log(cndThDtStreams);
				})

	}

	

	//);