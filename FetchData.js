
//requirejs([],

var tempJS=[];
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
					 
					 return tempJS.concat(data.results);
				 })
				 window.alert(tempJS);			 
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

	//);