
//requirejs([],

var tempJSString="";
var PAProcStat = false;
var SCProcStat = false;

    function fetchData() {
    	
		var checkBoxPA = document.getElementById("purpleaircheckbox");
		var checkBoxSC = document.getElementById("smartcitizencheckbox");
		//var checkBoxTS = document.getElementById("thingspeakcheckbox");
		
		 if (checkBoxPA.checked == true){
			 
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
					tempJSString = clone(JSON.stringify(data));
				 })
				 
				 console.log("dataString:" +tempJSString);		 
			  } 
		 
		 if (checkBoxSC.checked == true){
			 var url = "https://api.smartcitizen.me/v0/devices";
			
			 fetch(url).then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;})
				.then((response) => response.json())
			 .then(function(data){
				 return tempJS.concat(data);
			 })  
		 } 
		 
    }

	function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+"="+encodeURIComponent(obj[k]));return a},[]).join("&")};

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

	//);