/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to build a basic WorldWind globe.
 */
requirejs([],
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
	    
	    var req = new XMLHttpRequest();
	    req.open("GET", urlToUse, true);
	    req.send();
	    req.addEventListener("readystatechange", processReq, false);
	    
	    req.onreadystatechange = processRequest;
	    
	    function processRequest(e) {
	     
	    	if (req.readyState == 4 && req.status == 200) {
	            var resp = JSON.parse(req.responseText);
	            alert(resp.mapVersion);
	        }
	    	
	    }
	
	}
	
	function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+"="+encodeURIComponent(obj[k]));return a},[]).join("&")};

	);