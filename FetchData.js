
//requirejs([],

var tempJS=[];

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
	    req.addEventListener("readystatechange",processReq, false);
	    
	    //req.onreadystatechange = processReq(req);
	    
	   
	
	}
	
	 function processReq(e) {
	     
	    	if (this.readyState == 4 && this.status == 200) {
	            var resp = JSON.parse(this.responseText);
	            //window.alert("resp received "+resp.mapVersion);
	            tempJS.concat(resp.results);
	            window.alert("resp received "+resp.mapVersion);
	            //for (var i = 0; i < tempJS.length; i++) {
	                
	            //}
	            
	        }
	    	
	 }
	
	function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+"="+encodeURIComponent(obj[k]));return a},[]).join("&")};

	//);