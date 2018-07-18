
//requirejs([],
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
				  
				  makeHttpRequest(url+encParams);
			 
			  } 
		 
		 if (checkBoxSC.checked == true){
			    
			  } 
		

    }

	function makeHttpRequest(urlToUse) {
		
		//window.alert("httpreq executed");
	    
	    var req = new XMLHttpRequest();
	    req.open("GET", urlToUse, true);
	    req.send();
	    req.addEventListener("readystatechange",processReq(req), false);
	    
	    //req.onreadystatechange = processReq(req);
	    
	   
	
	}
	
	 function processReq(reqToPass) {
	     
	    	if (reqToPass.readyState == 4 && reqToPass.status == 200) {
	            var resp = JSON.parse(reqToPass.responseText);
	            window.alert("resp received "+resp.mapVersion);
	        }
	    	
	 }
	
	function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+"="+encodeURIComponent(obj[k]));return a},[]).join("&")};

	//);