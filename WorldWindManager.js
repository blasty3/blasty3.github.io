
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
   
    
}

function AddWWDIoTLayer(LayerToAdd){
    wwd.addLayer(LayerToAdd);
}

function RemoveWWDIoTLayer(LayerToRemove){
    wwd.removeLayer(LayerToRemove); 
}

function CreateWWDIoTSurfaceImage(){
       // Create a surface image using a static image.
       var surfaceImage1 = new WorldWind.SurfaceImage(new WorldWind.Sector(40, 50, -120, -100),
       "data/400x230-splash-nww.png");

   // Create a surface image using a static image and apply filtering to it.
   var surfaceImage2 = new WorldWind.SurfaceImage(new WorldWind.Sector(50, 60, -80, -60),
       "data/surface-image-nearest.png");
   surfaceImage2.resamplingMode = WorldWind.FILTER_NEAREST; // or FILTER_LINEAR by default

   // Create a surface image using a dynamically created image with a 2D canvas.

   var canvas = document.createElement("canvas"),
       ctx2d = canvas.getContext("2d"),
       size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

   canvas.width = size;
   canvas.height = size;

   var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
   gradient.addColorStop(0, 'rgb(255, 0, 0)');
   gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
   gradient.addColorStop(1, 'rgb(255, 0, 0)');

   ctx2d.fillStyle = gradient;
   ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
   ctx2d.fill();

   var surfaceImage3 = new WorldWind.SurfaceImage(new WorldWind.Sector(30, 40, -100, -80),
       new WorldWind.ImageSource(canvas));

   // Add the surface images to a layer and the layer to the WorldWindow's layer list.
   var surfaceImageLayer = new WorldWind.RenderableLayer();
   surfaceImageLayer.displayName = "Surface Images";
   surfaceImageLayer.addRenderable(surfaceImage1);
   surfaceImageLayer.addRenderable(surfaceImage2);
   surfaceImageLayer.addRenderable(surfaceImage3);
    wwd.addLayer(surfaceImageLayer);
}

function CreateWWDIoTRadialMark(ThingsLocationArr){
    // Create the custom image for the placemark with a 2D canvas.
    var canvas = document.createElement("canvas"),
    ctx2d = canvas.getContext("2d"),
    size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

    canvas.width = size;
    canvas.height = size;

    var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
   
    gradient.addColorStop(1, 'rgb(0, 255, 255)');

    ctx2d.fillStyle = gradient;
    ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
    ctx2d.fill();

    // Set placemark attributes.
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
    placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
    // Define the pivot point for the placemark at the center of its image source.
    placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
    placemarkAttributes.imageScale = 0.17
    //placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    placemarkAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
    placemarkAttributes.outlineColor = WorldWind.Color.BLUE;
    placemarkAttributes.applyLighting = true;

    // Set placemark highlight attributes.
    // Note that the normal attributes are specified as the default highlight attributes so that all properties
    // are identical except the image scale. You could instead vary the color, image, or other property
    // to control the highlight representation.
    var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightAttributes.imageScale = 0.21;
    
    highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);
    highlightAttributes.applyLighting = false;



    var placemarkLayer = new WorldWind.RenderableLayer("Custom Placemark");

    for(i=0;i<ThingsLocationArr.length;i++){
        
        var lat = parseFloat(ThingsLocationArr[i].latitude);
        var lon = parseFloat(ThingsLocationArr[i].longitude);

        // Create the placemark with the attributes defined above.
        var placemarkPosition = new WorldWind.Position(lat, lon, 3);
        var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
        // Draw placemark at altitude defined above, relative to the terrain.
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        // Assign highlight attributes for the placemark.
        placemark.highlightAttributes = highlightAttributes;

        // Create the renderable layer for placemarks.
        

        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);

    }

    

    // Add the placemarks layer to the WorldWindow's layer list.
    wwd.addLayer(placemarkLayer);

    // Now set up to handle highlighting.
    var highlightController = new WorldWind.HighlightController(wwd);

    wwd.redraw();
}
