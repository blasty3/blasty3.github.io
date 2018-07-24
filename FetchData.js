
//requirejs([],

var tempPA={};
var tempSC={};
var tempOSM={};
var tempSSant={};
var tempThingSpeak=[];

var tempDweet=[];


var cndTh = {};
var cndThLoc = {};
var cndThDtStreams = {};

var cndCityParams = ['calgary','edmonton','kamloops','kluanelake','montreal','ottawa','stalbert','victoria','winnipeg','yellowknife'];
var cndCityParamsActual = ['Calgary','Edmonton','Kamloops','Kluane Lake','Montreal','Ottawa','St. Albert','Victoria','Winnipeg','Yellowknife'];

var SENeth = {};

var SENijmTh = [];   
var SENijmThLoc = {};
var SENijmThDtStreams = {};

var allThingsPreviewDB=[];

var cors_purl = "https://cors.io/?";


var all_Query_Proms = [];

    function fetchData() {
		
		//need to re clear all global variables for the new search!
		
		
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
						EnableSearchButton();
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
			
			//DisableSearchButton();
			
			console.log("start searching....");
		    clearRegistry();

				 // smartcitizen
				 //data in format of array of JSON

			 var url = "https://api.smartcitizen.me/v0/devices/world_map";
			
			 all_Query_Proms.push(fetch(url).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempSC = clone(data);
				//console.log(data);
				return data;
			 })) 
			 
			 // OpenSenseMap

			 var url = "https://api.opensensemap.org/boxes";
			
			 all_Query_Proms.push(fetch(url).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempOSM = clone(data);
				//console.log(tempOSM);
			 }))

			 //Canada smart cities
			 //canadian cities to query

			 
				
			 // get all things

			 var urlhttp = "https://";
			 var nexturl = "-aq-sta.sensorup.com/v1.0/Things";
			 
			 var Prom_cty_cnd_th = [];
			 

			 

			 for(i = 0; i < cndCityParams.length; i++){


				// example
					//var apiRequest1 = fetch('api.example1.com/search').then(function(response){ 
					//	return response.json()
			   //});

			   var Prom_cty_cnd_th_el = fetch(urlhttp+cndCityParams[i]+nexturl).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error(response.statusText);
				}
				return response.json()
			   });

					/*		
				var Prom_cty_cnd_th_el = fetch(urlhttp+cndCityParams[i]+nexturl).then(function(response) {
					if (!response.ok) {
						EnableSearchButton();
						throw Error(response.statusText);
					}
					return response;})
					.then((response) => response.json())
				 		.then(function(data){
							 return data.value;
				 })
				 */

				 Prom_cty_cnd_th.push(Prom_cty_cnd_th_el);

			 }

			   all_Query_Proms.push(Promise.all(Prom_cty_cnd_th).then(function(values){
				
				for(k=0;k<values.length;k++){

					
					var cityname = values[k].value[0].properties.city;
						
					cndTh[cityname] = clone(values[k]);
					//console.log(cndTh);
	   
					//prepare for datastreams
					cndThDtStreams[cityname] = {};
	   
					// get locations of the things in each city
	   
					cndThLoc[cityname] = {};
					var datCpy = clone(values[k]);
					
	   
					for(i = 0; i < datCpy.value.length; i++){
	   
						//var url = datCpy.value[i]["Locations@iot.navigationLink"];
						
						/*
						fetch(url).then(function(response) {
								if (!response.ok) {
									EnableSearchButton();
									throw Error(response.statusText);
								}
								return response;})
								.then((response) => response.json())
									.then(function(data){
										var Device_ID = data.value[0]["@iot.id"];
	   
										cndThLoc[cityname][Device_ID] = clone(data.value[0].location.coordinates);
										console.log(cndThLoc);
	   
									})
									*/
									var device_id = datCpy.value[i].properties.displayName;
									all_Query_Proms.push(FetchLocationsCanada(cityname,device_id, datCpy.value[i]));


									// Canada Datastreams disabled. When user click certain thing, then that query is made for that particular thing only.
									//all_Query_Proms.push(FetchDatastreamsCanada(datCpy.value[i],device_id,cityname);

									//Promise.all([Prom_Th_Loc,Prom_Dt_Obsv]).then(function(values){
									//all_Query_Proms.push(Promise.all([Prom_Th_Loc]).then(function(values){	


									//}));


				     }
							
	   
					// get datastreams of individual sensors of each things in each city
	   
					

				}

			}))

			 

			 //Dweet (public ones), simply get the ones with GPS locations for pinpointing, the rest will be ignored

			 var url = "https://dweet.io/get/stats"; //get the most recent tweets from devices
			
			 var dweetdataclone=[];
			 var dweetQueryProms=[];

			 var dweetQueriedThings={};

			 all_Query_Proms.push(fetch(url).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
					.then(function(data){

						dweetdataclone = clone(data.with["active_things"]);

						var dweetThingObj = {};

						for(i=0;i<dweetdataclone.length;i++){
							if(!dweetThingObj[dweetdataclone[i].thing]){

								dweetThingObj[dweetdataclone[i].thing] = dweetdataclone[i];

							} 
						}

						//console.log(dweetThingObj);
						/*
							for (var property1 in object1) {
								string1 = string1 + object1[property1];
							}
						*/

						for(var prop in dweetThingObj){
							
							for(j=0;j<dweetThingObj[prop].keywords.length;j++){

								if (((dweetThingObj[prop].keywords[j]).toLowerCase().indexOf("gps")>=0) || ((dweetThingObj[prop].keywords[j]).toLowerCase().indexOf("latitude")>=0) || ((dweetThingObj[prop].keywords[j]).toLowerCase().indexOf("longitude")>=0)) {
									
									if(!dweetQueriedThings[prop]){

										dweetQueriedThings[prop] = "https://dweet.io/get/dweets/for/"+prop;
		
									} 

								}
							}

						}

						for(var prop in dweetQueriedThings){

							dweetQueryProms.push(fetch(dweetQueriedThings[prop]).then(function(response) {
								if (!response.ok) {
									EnableSearchButton();
									throw Error("error"+response.statusText);
								}
								return response;})
								.then((response) => response.json())
							 .then(function(data){
								return data.with;
							 }))
						}

						//console.log(dweetQueriedThings);

						all_Query_Proms.push(Promise.all(dweetQueryProms).then(function(values){
							
							
							for(i=0;i<values.length;i++){

								console.log("size " +values.length);

								var entryThDw = {};

								entryThDw.name = values[i][0].thing;

								var latitudegot = false;
								var longitudegot = false;

								if(values[i][0].content["latitude"] && !latitudegot){
									latitudegot = true;
									entryThDw.latitude= values[i][0].content.latitude;
								}

								if(values[i][0].content["Latitude"] && !latitudegot){
									latitudegot = true;
									entryThDw.latitude= values[i][0].content.Latitude;
								}

								if(values[i][0].content["gps lat"] && !latitudegot){
									latitudegot = true;
									entryThDw.latitude= values[i][0].content["gps lat"];
								}

								if(values[i][0].content["GPS_LAT"] && !latitudegot){
									latitudegot = true;
									entryThDw.latitude= values[i][0].content["GPS_LAT"];
								}

								if(values[i][0].content["longitude"] && !longitudegot ){
									longitudegot = true;
									entryThDw.longitude= values[i][0].content.longitude;
								}

								if(values[i][0].content["Longitude"] && !longitudegot){
									longitudegot = true;
									entryThDw.longitude= values[i][0].content.Longitude;
								}

								if(values[i][0].content["gps long"] && !longitudegot){
									longitudegot = true;
									entryThDw.longitude= values[i][0].content["gps long"]
								}

								if(values[i][0].content["GPS_LNG"] && !longitudegot){
									longitudegot = true;
									entryThDw.longitude= values[i][0].content["GPS_LNG"];
								}

								var measurementsArr = [];

								for(j=0;j<values[i].length;j++){
									values[i][j].content.created = values[i][j].created;
									measurementsArr.push(values[i][j]);
								}

								entryThDw.measurements = measurementsArr;

								tempDweet.push(entryThDw);

							}

							//console.log(tempDweet);
						//tempDweet.push(data.with["active_things"][i]);
		
					}));


				    

			 }))

			  //Smart Santander
			 
			 var url = cors_purl+"http://maps.smartsantander.eu/php/getdata.php";
			
			 all_Query_Proms.push(fetch(url).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error("error"+response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				tempSSant = clone(data.markers);
				//console.log(tempSSant);
			 }))

			 
			 
			 // List of all Thingspeak public channels, there are 15 pages total, add "?page=2" etc.
			 // loop
			 // will disregard the ones with latitude & longitude data of 0.0 exactly (can't be geolocated on the map)

			 
			 var url = "https://api.thingspeak.com/channels/public.json";
			
			 var ThSpProm_pg1 = fetch(cors_purl+url).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error("error"+response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				//tempThingSpeak = clone(data.channels);
				//console.log(tempThingSpeak);
				return data;
			 })
			 all_Query_Proms.push(ThSpProm_pg1);

			 var ThSpProm_Arr = [];

			 Promise.all([ThSpProm_pg1]).then(function(values){

				for(j=0;j<values[0].channels.length;j++){
					var lat = values[0].channels[j].latitude;
					var lon = values[0].channels[j].longitude;

					if(lat === "0.0" && lon === "0.0"){

					} else {
						values[0].channels[j].provider == "thingspeak";
						tempThingSpeak.push(values[0].channels[j]);
					}

				}

					var total_pages = Math.floor(parseInt(values[0].pagination.total_entries)/parseInt(values[0].pagination.per_page));
					var remainder = parseInt(values[0].pagination.total_entries)%parseInt(values[0].pagination.per_page);
					if(remainder>0){
						total_pages++;
					}

					if(total_pages>1){

						// maximum should be total_pages, but need to limit since ThingSpeak server can't handle many queries
						for(i=2;i<=20;i++){

							ThSpProm_Arr.push(fetch(cors_purl+url+"?page="+i).then(function(response) {
								if (!response.ok) {
									EnableSearchButton();
									throw Error("error"+response.statusText);
								}
								return response;})
								.then((response) => response.json())
							 .then(function(data){
								//tempThingSpeak = clone(data);
								//console.log(tempThingSpeak);
								return data.channels;
							 }))

						}

						all_Query_Proms.push(Promise.all(ThSpProm_Arr).then(function(values){
										
							for(i=0;i<values.length;i++){
								for(j=0;j<values[i].length;j++){
									var lat = values[i][j].latitude;
									var lon = values[i][j].longitude;
	
									if(lat == "0.0" && lon == "0.0"){
	
									} else {
										values[i][j].provider = "thingspeak";
										tempThingSpeak.push(values[i][j]);
										//tempThingSpeak = clone(tempThingSpeak.concat(values[j]));
									}
	
								}
							}
							

						}));

					}
			 });

			 

			 // Netherlands Smart Emission Project. 
			 // URL of all stations : http://data.smartemission.nl/sosemu/api/v1/stations
			 // Timeseries example : http://data.smartemission.nl/sosemu/api/v1/timeseries?format=json&station=stationlabel


			 var urlhttp = "http://data.smartemission.nl/sosemu/api/v1/stations";

			 var NijmTh1_Prom = fetch(cors_purl+urlhttp).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
					 .then(function(data){

						return data;
					

			 })

			 all_Query_Proms.push(NijmTh1_Prom);

			 all_Query_Proms.push(Promise.all([NijmTh1_Prom]).then(function(values){
										
				SENeth = clone(values[0]);

			}));

			 
			 /*


			 //  Smart Emission Nijmegen Project

			 // need two queries of the Things. Heavier and only shows Nijmegen, will use Netherlands one with SOS EMU instead!


			 var urlhttp1 = "http://data.smartemission.nl/gost/v1.0/Things";

			 var urlhttp2 = "http://data.smartemission.nl/gost/v1.0/Things?$top=100&$skip=100";

			
		    var NijmTh1 = fetch(cors_purl+urlhttp1).then(function(response) {
					if (!response.ok) {
						EnableSearchButton();
						throw Error(response.statusText);
					}
					return response;})
					.then((response) => response.json())
				 		.then(function(data){

							return data.value;
						

				 })

				 var NijmTh2 = fetch(cors_purl+urlhttp2).then(function(response) {
					if (!response.ok) {
						EnableSearchButton();
						throw Error(response.statusText);
					}
					return response;})
					.then((response) => response.json())
				 		.then(function(data){

							return data.value;
						
				 })

								 all_Query_Proms.push(Promise.all([NijmTh1,NijmTh2]).then(function(values){
									SENijmTh = values[0].concat(values[1]);
									

									// ok, now get the locations and datastreams!!!
										for(i=0;i<SENijmTh.length;i++){
												var device_id = SENijmTh[i]["description"];
												var Prom_NijmTh_Loc = FetchLocationsNijmegen(device_id,SENijmTh[i]);
												all_Query_Proms.push(Prom_NijmTh_Loc);
												//Disable data streams for now
												//var Prom_NijmTh_DtStreams_Obsv = FetchDatastreamsNijmegen(SENijmTh[i],device_id);

												//Promise.all([Prom_NijmTh_Loc,Prom_NijmTh_DtStreams_Obsv]).then(function(values){
												Promise.all([Prom_NijmTh_Loc]).then(function(values){
										


												});

										}


									}));
									
									*/


									Promise.all(all_Query_Proms).then(function(values){
										
										window.alert("Search is complete!");
										EnableSearchButton();
										var extraction_prom = ExtractAllThingsLocation();

										Promise.all([extraction_prom]).then(function(values){

											CreateWWDIoTRadialMark(allThingsPreviewDB);

										});
										

									});
				 
			 
		 
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



	function FetchDatastreamsCanada(Things_Data, Device_ID, cityName){

		var PromArr = [];

		//for(i = 0; i < Things_Data_Arr.value.length; i++){

								var datastreams_url = Things_Data["Datastreams@iot.navigationLink"];
								//var Device_ID = Things_Data_Arr.value[i]["@iot.id"];
								cndThDtStreams[cityName][Device_ID] = {};

								PromArr.push(fetch(datastreams_url).then(function(response) {
									if (!response.ok) {
										EnableSearchButton();
										throw Error(response.statusText);
									}
									return response;})
									.then((response) => response.json())
										.then(function(data){

												//var sensor_datastreams_arr = clone(data.value);
												return data.value;
												
										}))

										

		//}


		        var Prom_Obsvs = [];

				var Prom_DtStreams = Promise.all(PromArr).then(function(values){
					
					//console.log("values array size a " +values.length);

					for(j = 0 ; j < values.length ; j++){

						//console.log("value array size b " +values[j].length);

						for(l = 0 ; l < values[j].length ; l++){

							var sensor_id = values[j][l]["@iot.id"];
							var sensor_name = values[j][l].name;
							var sensor_description = values[j][l].description;
							var sensor_unit_measurement = values[j][l].unitOfMeasurement;
							var sensor_obsv_url = values[j][l]["Observations@iot.navigationLink"];

							cndThDtStreams[cityName][Device_ID][sensor_id] = {};

							cndThDtStreams[cityName][Device_ID][sensor_id].name=sensor_name;
							cndThDtStreams[cityName][Device_ID][sensor_id].description=sensor_description;
							cndThDtStreams[cityName][Device_ID][sensor_id].unitOfMeasurement=sensor_unit_measurement;

							
							Prom_Obsvs.push(FetchObservationsCanada(cityName,Device_ID,sensor_id,sensor_obsv_url));

						}
						//var Device_ID = Things_Data_Arr.value[j]["@iot.id"];
						


					}

				});

				var prom_obsv = Promise.all(Prom_Obsvs).then(function(values){


				});

		
				return prom_obsv;
						
	}


	function FetchObservationsCanada(cityName, device_id, sensor_id, obsv_url){

		

		var PromArr = [];
		
				// get "observations" (sensor measurements) of individual sensors of each things in each city
		
				PromArr.push(fetch(obsv_url+"?$top=2000").then(function(response) {  // get historical data
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response;})
					.then((response) => response.json())
						.then(function(data){
						
							return data.value;
						}))


				var prom_obsv = Promise.all(PromArr).then(function(values){

					cndThDtStreams[cityName][device_id][sensor_id].sensor_measurements = values[0].value;

				});

				return prom_obsv;

	}


	function FetchLocationsCanada(cityName, device_id, Things_Data){

		//var PromArr = [];
		

		
			var loc_url = Things_Data["Locations@iot.navigationLink"];
		

			// Template
			//var Prom_cty_cnd_th_el = fetch(urlhttp+cndCityParams[i]+nexturl).then(function(response) {
			//	if (!response.ok) {
			//		throw Error(response.statusText);
			//	}
			//	return response.json()
			//   });

			var prom_loc_el = fetch(loc_url).then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json()});

				//PromArr.push(prom_loc_el);

		
					var prom_loc = Promise.all([prom_loc_el]).then(function(values){

						for(i=0;i<values.length;i++){
							cndThLoc[cityName][device_id] = clone(values[i].value[0].location.coordinates);
						}
						//console.log(values);
						
						//console.log(cndThLoc);
	
					});

				    return prom_loc;

	}




	/// Below for Nijmegen Smart Emission


	function FetchDatastreamsNijmegen(Things_Data, Device_ID){

		var PromArr = [];

		//for(i = 0; i < Things_Data_Arr.value.length; i++){

								var datastreams_url = cors_purl+(Things_Data["Datastreams@iot.navigationLink"]);
								//var Device_ID = Things_Data_Arr.value[i]["@iot.id"];
								SENijmThDtStreams[Device_ID] = {};

								PromArr.push(fetch(datastreams_url).then(function(response) {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response;})
									.then((response) => response.json())
										.then(function(data){

												//var sensor_datastreams_arr = clone(data.value);
												return data.value;
												
										}))

										

		//}


		        var Prom_Obsvs = [];

				var Prom_DtStreams = Promise.all(PromArr).then(function(values){
					
					//console.log("values array size a " +values.length);

					for(j = 0 ; j < values.length ; j++){

						//console.log("value array size b " +values[j].length);

						for(l = 0 ; l < values[j].length ; l++){

							var sensor_id = values[j][l]["@iot.id"];
							var sensor_name = values[j][l].name;
							var sensor_description = values[j][l].description;
							var sensor_unit_measurement = values[j][l].unitOfMeasurement;
							var sensor_obsv_url = cors_purl+(values[j][l]["Observations@iot.navigationLink"]);

							SENijmThDtStreams[Device_ID][sensor_id] = {};

							SENijmThDtStreams[Device_ID][sensor_id].name=sensor_name;
							SENijmThDtStreams[Device_ID][sensor_id].description=sensor_description;
							SENijmThDtStreams[Device_ID][sensor_id].unitOfMeasurement=sensor_unit_measurement;

							Prom_Obsvs.push(FetchObservationsNijmegen(Device_ID,sensor_id,sensor_obsv_url));

						}
						//var Device_ID = Things_Data_Arr.value[j]["@iot.id"];
						


					}

				});

				var prom_obsv = Promise.all(Prom_Obsvs).then(function(values){


				});

		
				return prom_obsv;
						
	}


	function FetchObservationsNijmegen(device_id, sensor_id, obsv_url){

		

		var PromArr = [];
		
				// get "observations" (sensor measurements) of individual sensors of each things in each city
		
				PromArr.push(fetch(obsv_url+"?$top=2000").then(function(response) {  // get historical data
					if (!response.ok) {
						EnableSearchButton();
						throw Error(response.statusText);
					}
					return response;})
					.then((response) => response.json())
						.then(function(data){
						
							return data.value;
						}))


				var prom_obsv = Promise.all(PromArr).then(function(values){

					SENijmThDtStreams[device_id][sensor_id].sensor_measurements = values[0].value;

				});

				return prom_obsv;

	}


	function FetchLocationsNijmegen(device_id, Things_Data){

		var PromArr = [];

		
			var loc_url = cors_purl+(Things_Data["Locations@iot.navigationLink"]);
		

			// Template
			//var Prom_cty_cnd_th_el = fetch(urlhttp+cndCityParams[i]+nexturl).then(function(response) {
			//	if (!response.ok) {
			//		throw Error(response.statusText);
			//	}
			//	return response.json()
			//   });

			var prom_loc_el = fetch(loc_url).then(function(response) {
				if (!response.ok) {
					EnableSearchButton();
					throw Error(response.statusText);
				}
				return response.json()});

				PromArr.push(prom_loc_el);

		
					var prom_loc = Promise.all(PromArr).then(function(values){

						for(i=0;i<values.length;i++){
							SENijmThLoc[device_id] = clone(values[i].value[0].location.coordinates);
						}
						//console.log(values);
						
						console.log(SENijmThLoc);
	
					});

				    return prom_loc;

	}

 function clearRegistry() {

	all_Query_Proms = [];

	tempPA={};
	tempSC={};
	tempOSM={};
	tempSSant={};
	tempThingSpeak=[];
	tempDweet=[];


	cndTh = {};
	cndThLoc = {};
	cndThDtStreams = {};

	SENeth = {};

	SENijmTh = [];   
	SENijmThLoc = {};
	SENijmThDtStreams = {};

 }

 function DisableSearchButton(){
	document.getElementById("SearchButton").style.color = "gray";
	document.getElementById("SearchButton").disabled = true;
 }

 function EnableSearchButton(){
	document.getElementById("SearchButton").disabled = false;
	document.getElementById("SearchButton").style.color = "black";
	document.getElementById("SearchButton").value= "Search!";
 }

 function StartSearch(){
	document.getElementById("SearchButton").value= "Searching";
	DisableSearchButton();
	fetchData();
 }

function TriggerSearch() {
	console.log("Triggering search....");
	fetchData();
}

async function ExtractAllThingsLocation(){

	// Extract from SmartCitizen

	for(i=0;i<tempSC.length;i++){
		allThingsPreviewDB.push({
			// Relevant parameters would go here
			"name" : tempSC[i].name,
			"latitude" : tempSC[i].latitude,
			"longitude" : tempSC[i].longitude,
			"cityName" : tempSC[i].city,
			"lastSeen" : tempSC[i]["last_reading_at"],
			"providerID": "smartcitizen"
		});
		/*
		allThingsPreviewDB[tempSC[i].name] = {
			// Relevant parameters would go here
			"latitude" : tempSC[i].latitude,
			"longitude" : tempSC[i].longitude
		};
		*/
	}

	// Extract from OpenSenseMap
	// longitude = value[0];
	//latitude = value [1];

	for(i=0;i<tempOSM.length;i++){
		
		for(j=0;j<tempOSM[i].sensors.length;j++){
			tempOSM[i].sensors[j].lastMeasurement;
		}
		allThingsPreviewDB.push({
			// Relevant parameters would go here
			"name" : tempOSM[i].name,
			"latitude" : tempOSM[i].currentLocation.coordinates[1],
			"longitude" : tempOSM[i].currentLocation.coordinates[0],
			"providerID" : "opensensemap",
			"lastSeen" : tempOSM[i].updatedAt
			
		});
		/*
		allThingsPreviewDB[tempOSM[i].name] = {
			// Relevant parameters would go here
			"latitude" : tempOSM[i].currentLocation.coordinates[1],
			"longitude" : tempOSM[i].currentLocation.coordinates[0]
		};
		*/
	}

	// Extract from Canada Smart City
	// longitude = value[0];
	//latitude = value [1];
	//console.log(cndThLoc);

	   for(i=0;i<cndCityParamsActual.length;i++){

		//console.log(cndCityParams[i]);
		//console.log(cndThLoc[cndCityParams[i]]);

		  for (var keys in cndThLoc[cndCityParamsActual[i]]) {
			  allThingsPreviewDB.push({
				// Relevant parameters would go here
				"name" : keys,
				"latitude" : cndThLoc[cndCityParamsActual[i]][keys][1],
				"longitude" : cndThLoc[cndCityParamsActual[i]][keys][0],
				"cityname_link" : cndCityParams[i],
				"cityname_actual" : cndCityParamsActual[i],
				"providerID" : "smartcanada"
			  });
		  }
			/*
			for (var keys in cndThLoc.cndCityParams[i]) {
			allThingsLocDB[keys] = {
				// Relevant parameters would go here
				"latitude" : cndThLoc.cndCityParams[i][keys][1],
				"longitude" : cndThLoc.cndCityParams[i][keys][0]
			};
			*/
	
	  }

	  // Extract from Dweet (only latest 500 devices who tweeted), only search those which has gps data
	  // this task has been done during queries

	  // Extract from SmartSantander
	  
	  //extract info template
	  /*
	  var el = document.createElement( 'html' );
		el.innerHTML = "<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>";

		el.getElementsByTagName( 'a' ); 
	  */

	  for(i=0;i<tempSSant.length;i++){
	
			  // Relevant parameters would go here
			   tempSSant[i].name = tempSSant[i].id;
			   tempSSant[i].providerID = "smartsantander";
			   delete tempSSant[i].id;
	  }
	  allThingsPreviewDB = clone(allThingsPreviewDB.concat(tempSSant));


	  // Extract from Smart Emission Netherlands
	  
	  for(i=0;i<SENeth.length;i++){
		var SENethArr = {};
		SENethArr.name = SENeth[i].properties.label;
		SENethArr.latitude = SENeth[i].geometry.coordinates[1];
		SENethArr.longitude = SENeth[i].geometry.coordinates[0];
		SENethArr.lastSeen = SENeth[i].properties["last_update"];
		SENethArr.providerID = "netherlandssmartemission";
		allThingsPreviewDB.push(SENethArr);
	  }

	  // From ThingSpeak
	  allThingsPreviewDB = clone (allThingsPreviewDB.concat(tempThingSpeak));

	  console.log(allThingsPreviewDB);

	  

}