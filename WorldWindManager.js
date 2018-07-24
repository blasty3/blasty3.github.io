
var wwd;
var layers; // array of layers

function StartWorldWind() {
    // Create a WorldWindow for the canvas.
    wwd = new WorldWind.WorldWindow("canvasOne");
    // Add some image layers to the WorldWindow's globe.
    layers = [
        // Imagery layers.
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        {layer: new WorldWind.OpenStreetMapImageLayer(null), enabled: false},
        // Add atmosphere layer on top of all base layers.
        {layer: new WorldWind.AtmosphereLayer(), enabled: true},
        // WorldWindow UI layers.
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    // Create a placemark to select.
    var breckenridgePosition = new WorldWind.Position(39.481019, -106.045398, 0);
    var breckenridge = new WorldWind.Placemark(breckenridgePosition);
    breckenridge.displayName = "Breckenridge Placemark";
    breckenridge.altitudeMode = WorldWind.CLAMP_TO_GROUND;
    breckenridge.label = "Breckenridge";
    var breckenridgeAttributes = new WorldWind.PlacemarkAttributes();
    breckenridgeAttributes.imageSource = "https://zglueck.github.io/workshop-demo/resources/images/breckenridge-logo.png";
    breckenridge.attributes = breckenridgeAttributes;
    var resortLocations = new WorldWind.RenderableLayer();
    resortLocations.addRenderable(breckenridge);
    wwd.addLayer(resortLocations);



    // The common pick-handling function.
    var handlePick = function(o) {
    // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
    // the mouse or tap location.
    var x = o.clientX,
        y = o.clientY;

    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

    // Report the top picked object, if any.
    var topPickedObject = pickList.topPickedObject();
    
    if (topPickedObject && topPickedObject.isTerrain) {
        var pickResult = document.getElementById("pick-result");
        
        pickResult.textContent = topPickedObject.position;
        pickResult.style.cursor = "pointer";
        
    } else if (topPickedObject) {
        //console.log("element obj id: " +document.getElementById(topPickedObject.userObject.displayName));
        
        if(topPickedObject.userObject.providerID === "smartcanada"){

        }  else if (topPickedObject.userObject.providerID === "thingspeak"){
            // var thSumNameEl = document.getElementById("thingsSummarySmartSantander");
           
         } else if (topPickedObject.userObject.providerID === "smartsantander"){
           // var thSumNameEl = document.getElementById("thingsSummarySmartSantander");
            var newContent = document.createElement("div");
            newContent.innerHTML = topPickedObject.userObject.content;
            document.getElementById('thingsSummarySmartSantander').appendChild(div);
        } else {
            var thSumNameEl = document.getElementById("thingsSummaryName");
            thSumNameEl.innerHTML = "Name: " +topPickedObject.userObject.displayName;
            var thSumLastUpdEl = document.getElementById("thingsSummaryLastUpdate");
            thSumLastUpdEl.innerHTML = "Last Seen: " +topPickedObject.userObject.lastSeen;
        }
        //pickResult.style.cursor = "pointer";
        //pickResult.style.left = o.pageX;
        //pickResult.style.top = o.pageY;
        //console.log("left/x pos: " +pickResult.style.left);
        //console.log("top/y pos: " +pickResult.style.top);

      

        //console.log("event handler x,y: " +x+","+y);
        //console.log("mouse location x,y: " +o.pageX+ "," +o.pageY);
        //console.log("element location offset x,y: " +offset(pickResult).top+ "," +offset(pickResult).left);
        //console.log("element location getPosition x,y: " +getPosition(pickResult).x+ "," +getPosition(pickResult).y);
        //pickResult.style.cursor = "pointer";
           
            
        } else {
            var pickResult = document.getElementById("pick-result");
            pickResult.textContent = "Nothing Selected";
            pickResult.cursor = "default";
        }
    };

    /*
    var handleMove = function(o) {
        // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
        // the mouse or tap location.
        var x = o.clientX,
            y = o.clientY;
    
        // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
        // relative to the upper left corner of the canvas rather than the upper left corner of the page.
        var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
    
        // Report the top picked object, if any.
        var topPickedObject = pickList.topPickedObject();

        if (topPickedObject) {
            hoverResult.cursor = "pointer";
        } else {
            hoverResult.cursor = "context-menu";
        }
        };
*/

    // Listen for mouse moves and touch taps.
    wwd.addEventListener("mousemove", handlePick);
   // wwd.addEventListener("mousemove", handleMove);
    var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);
    //window.addEventListener("scroll", updatePosition, false);
    //window.addEventListener("resize", updatePosition, false);
    
}

function AddWWDIoTLayer(LayerToAdd){
    wwd.addLayer(LayerToAdd);
}

function RemoveWWDIoTLayer(LayerToRemove){
    wwd.removeLayer(LayerToRemove); 
}


async function CreateWWDIoTRadialMark(ThingsLocationArr){
   

    // Set placemark attributes.
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
    //placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
    placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node.png";
    // Define the pivot point for the placemark at the center of its image source.
    placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
    placemarkAttributes.imageScale = 0.22;
    //placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    placemarkAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
    placemarkAttributes.outlineColor = WorldWind.Color.BLUE;
    placemarkAttributes.applyLighting = true;

    // Set placemark highlight attributes.
    // Note that the normal attributes are specified as the default highlight attributes so that all properties
    // are identical except the image scale. You could instead vary the color, image, or other property
    // to control the highlight representation.
    var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightAttributes.imageScale = 0.29;
    
    highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);
    highlightAttributes.applyLighting = false;

    var placemarkLayer = new WorldWind.RenderableLayer("Things Placemark");

    for(i=0;i<ThingsLocationArr.length;i++){
        
        var lat = parseFloat(ThingsLocationArr[i].latitude);
        var lon = parseFloat(ThingsLocationArr[i].longitude);

        // Create the placemark with the attributes defined above.
        var placemarkPosition = new WorldWind.Position(lat, lon, 0);
        var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
        // Draw placemark at altitude defined above.
        placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
        // Assign highlight attributes for the placemark.
        placemark.highlightAttributes = highlightAttributes;
        placemark.displayName = ThingsLocationArr[i].name;
        placemark.providerID = ThingsLocationArr[i].providerID;
        
        if(ThingsLocationArr[i].providerID === "smartsantander"){
            placemark.content = ThingsLocationArr[i].content;
        } else {
            placemark.lastSeen = ThingsLocationArr[i].lastSeen;
        }

        /*
        var el = document.createElement("a");
        
        el.id = ThingsLocationArr[i].name;
        el.href = "https://blasty3.github.io";
        el.rel = "noopener noreferrer";
        el.target = "_blank";

        if(i === 1 || i ===2 || i === 3){
            var txt = document.createTextNode("link to: " +ThingsLocationArr[i].name);
            el.appendChild(txt);
        }

        document.body.appendChild(el);
        */

        // Create the renderable layer for placemarks.
        
        
        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);

    }

    // Add the placemarks layer to the WorldWindow's layer list.
    wwd.addLayer(placemarkLayer);
    // Now set up to handle highlighting.
    var highlightController = new WorldWind.HighlightController(wwd);

}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }
