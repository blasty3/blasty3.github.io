
//requirejs([],
    function fetchData() {
    	
    	window.alert("fetchData executed");
        
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
	    
	    var req = new XMLHttpRequest();
	    req.open("GET", urlToUse, true);
	    req.send();
	    req.addEventListener("readystatechange", processReq, false);
	    
	    
	    
	    req.onreadystatechange = processRequest;
	    
	    function processRequest(e) {
	     
	    	if (req.readyState == 4 && req.status == 200) {
	            var resp = JSON.parse(req.responseText);
	            window.alert(resp.mapVersion);
	        }
	    	
	    }
	
	}
	
	function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+"="+encodeURIComponent(obj[k]));return a},[]).join("&")};

	//);