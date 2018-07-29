//Written by Udayanto Dwi Atmojo


var wwd;
var layers; // array of layers

var allThingsDB=[];

var topPickedObject;

var copyToPass={};

var placemarkLayerAllDev= new WorldWind.RenderableLayer("All Things Placemark");

var placemarkLayerDevByLoc=new WorldWind.RenderableLayer("Filtered Placemarks");

var countrycodeJS = { 
    af: { code: 'af', name: 'Afghanistan' },
    ax: { code: 'ax', name: 'Åland Islands' },
    al: { code: 'al', name: 'Albania' },
    dz: { code: 'dz', name: 'Algeria' },
    as: { code: 'as', name: 'American Samoa' },
    ad: { code: 'ad', name: 'AndorrA' },
    ao: { code: 'ao', name: 'Angola' },
    ai: { code: 'ai', name: 'Anguilla' },
    aq: { code: 'aq', name: 'Antarctica' },
    ag: { code: 'ag', name: 'Antigua and Barbuda' },
    ar: { code: 'ar', name: 'Argentina' },
    am: { code: 'am', name: 'Armenia' },
    aw: { code: 'aw', name: 'Aruba' },
    au: { code: 'au', name: 'Australia' },
    at: { code: 'at', name: 'Austria' },
    az: { code: 'az', name: 'Azerbaijan' },
    bs: { code: 'bs', name: 'Bahamas' },
    bh: { code: 'bh', name: 'Bahrain' },
    bd: { code: 'bd', name: 'Bangladesh' },
    bb: { code: 'bb', name: 'Barbados' },
    by: { code: 'by', name: 'Belarus' },
    be: { code: 'be', name: 'Belgium' },
    bz: { code: 'bz', name: 'Belize' },
    bj: { code: 'bj', name: 'Benin' },
    bm: { code: 'bm', name: 'Bermuda' },
    bt: { code: 'bt', name: 'Bhutan' },
    bo: { code: 'bo', name: 'Bolivia' },
    ba: { code: 'ba', name: 'Bosnia and Herzegovina' },
    bw: { code: 'bw', name: 'Botswana' },
    bv: { code: 'bv', name: 'Bouvet Island' },
    br: { code: 'br', name: 'Brazil' },
    io: { code: 'io', name: 'British Indian Ocean Territory' },
    bn: { code: 'bn', name: 'Brunei Darussalam' },
    bg: { code: 'bg', name: 'Bulgaria' },
    bf: { code: 'bf', name: 'Burkina Faso' },
    bi: { code: 'bi', name: 'Burundi' },
    kh: { code: 'kh', name: 'Cambodia' },
    cm: { code: 'cm', name: 'Cameroon' },
    ca: { code: 'ca', name: 'Canada' },
    cv: { code: 'cv', name: 'Cape Verde' },
    ky: { code: 'ky', name: 'Cayman Islands' },
    cf: { code: 'cf', name: 'Central African Republic' },
    td: { code: 'td', name: 'Chad' },
    cl: { code: 'cl', name: 'Chile' },
    cn: { code: 'cn', name: 'China' },
    cw: { code: 'cw', name: 'Curaçao' },
    cx: { code: 'cx', name: 'Christmas Island' },
    cc: { code: 'cc', name: 'Cocos (Keeling) Islands' },
    co: { code: 'co', name: 'Colombia' },
    km: { code: 'km', name: 'Comoros' },
    cg: { code: 'cg', name: 'Congo' },
    cd: { code: 'cd', name: 'Congo, Democratic Republic' },
    ck: { code: 'ck', name: 'Cook Islands' },
    cr: { code: 'cr', name: 'Costa Rica' },
    ci: { code: 'ci', name: 'Cote D"Ivoire' },
    hr: { code: 'hr', name: 'Croatia' },
    cu: { code: 'cu', name: 'Cuba' },
    cy: { code: 'cy', name: 'Cyprus' },
    cz: { code: 'cz', name: 'Czech Republic' },
    dk: { code: 'dk', name: 'Denmark' },
    dj: { code: 'dj', name: 'Djibouti' },
    dm: { code: 'dm', name: 'Dominica' },
    do: { code: 'do', name: 'Dominican Republic' },
    ec: { code: 'ec', name: 'Ecuador' },
    eg: { code: 'eg', name: 'Egypt' },
    sv: { code: 'sv', name: 'El Salvador' },
    gq: { code: 'gq', name: 'Equatorial Guinea' },
    er: { code: 'er', name: 'Eritrea' },
    ee: { code: 'ee', name: 'Estonia' },
    et: { code: 'et', name: 'Ethiopia' },
    fk: { code: 'fk', name: 'Falkland Islands (Malvinas)' },
    fo: { code: 'fo', name: 'Faroe Islands' },
    fj: { code: 'fj', name: 'Fiji' },
    fi: { code: 'fi', name: 'Finland' },
    fr: { code: 'fr', name: 'France' },
    gf: { code: 'gf', name: 'French Guiana' },
    pf: { code: 'pf', name: 'French Polynesia' },
    tf: { code: 'tf', name: 'French Southern Territories' },
    ga: { code: 'ga', name: 'Gabon' },
    gm: { code: 'gm', name: 'Gambia' },
    ge: { code: 'ge', name: 'Georgia' },
    de: { code: 'de', name: 'Germany' },
    gh: { code: 'gh', name: 'Ghana' },
    gi: { code: 'gi', name: 'Gibraltar' },
    gr: { code: 'gr', name: 'Greece' },
    gl: { code: 'gl', name: 'Greenland' },
    gd: { code: 'gd', name: 'Grenada' },
    gp: { code: 'gp', name: 'Guadeloupe' },
    gu: { code: 'gu', name: 'Guam' },
    gt: { code: 'gt', name: 'Guatemala' },
    gg: { code: 'gg', name: 'Guernsey' },
    gn: { code: 'gn', name: 'Guinea' },
    gw: { code: 'gw', name: 'Guinea-Bissau' },
    gy: { code: 'gy', name: 'Guyana' },
    ht: { code: 'ht', name: 'Haiti' },
    hm: { code: 'hm', name: 'Heard Island and Mcdonald Islands' },
    va: { code: 'va', name: 'Holy See (Vatican City State)' },
    hn: { code: 'hn', name: 'Honduras' },
    hk: { code: 'hk', name: 'Hong Kong' },
    hu: { code: 'hu', name: 'Hungary' },
    is: { code: 'is', name: 'Iceland' },
    in: { code: 'in', name: 'India' },
    id: { code: 'id', name: 'Indonesia' },
    ir: { code: 'ir', name: 'Iran' },
    iq: { code: 'iq', name: 'Iraq' },
    ie: { code: 'ie', name: 'Ireland' },
    im: { code: 'im', name: 'Isle of Man' },
    il: { code: 'il', name: 'Israel' },
    it: { code: 'it', name: 'Italy' },
    jm: { code: 'jm', name: 'Jamaica' },
    jp: { code: 'jp', name: 'Japan' },
    je: { code: 'je', name: 'Jersey' },
    jo: { code: 'jo', name: 'Jordan' },
    kz: { code: 'kz', name: 'Kazakhstan' },
    ke: { code: 'ke', name: 'Kenya' },
    ki: { code: 'ki', name: 'Kiribati' },
    kp: { code: 'kp', name: 'Korea (North)' },
    kr: { code: 'kr', name: 'Korea (South)' },
    xk: { code: 'xk', name: 'Kosovo' },
    kw: { code: 'kw', name: 'Kuwait' },
    kg: { code: 'kg', name: 'Kyrgyzstan' },
    la: { code: 'la', name: 'Laos' },
    lv: { code: 'lv', name: 'Latvia' },
    lb: { code: 'lb', name: 'Lebanon' },
    ls: { code: 'ls', name: 'Lesotho' },
    lr: { code: 'lr', name: 'Liberia' },
    ly: { code: 'ly', name: 'Libyan Arab Jamahiriya' },
    li: { code: 'li', name: 'Liechtenstein' },
    lt: { code: 'lt', name: 'Lithuania' },
    lu: { code: 'lu', name: 'Luxembourg' },
    mo: { code: 'mo', name: 'Macao' },
    mk: { code: 'mk', name: 'Macedonia' },
    mg: { code: 'mg', name: 'Madagascar' },
    mw: { code: 'mw', name: 'Malawi' },
    my: { code: 'my', name: 'Malaysia' },
    mv: { code: 'mv', name: 'Maldives' },
    ml: { code: 'ml', name: 'Mali' },
    mt: { code: 'mt', name: 'Malta' },
    mh: { code: 'mh', name: 'Marshall Islands' },
    mq: { code: 'mq', name: 'Martinique' },
    mr: { code: 'mr', name: 'Mauritania' },
    mu: { code: 'mu', name: 'Mauritius' },
    yt: { code: 'yt', name: 'Mayotte' },
    mx: { code: 'mx', name: 'Mexico' },
    fm: { code: 'fm', name: 'Micronesia' },
    md: { code: 'md', name: 'Moldova' },
    mc: { code: 'mc', name: 'Monaco' },
    mn: { code: 'mn', name: 'Mongolia' },
    ms: { code: 'ms', name: 'Montserrat' },
    ma: { code: 'ma', name: 'Morocco' },
    mz: { code: 'mz', name: 'Mozambique' },
    mm: { code: 'mm', name: 'Myanmar' },
    na: { code: 'na', name: 'Namibia' },
    nr: { code: 'nr', name: 'Nauru' },
    np: { code: 'np', name: 'Nepal' },
    nl: { code: 'nl', name: 'Netherlands' },
    an: { code: 'an', name: 'Netherlands Antilles' },
    nc: { code: 'nc', name: 'New Caledonia' },
    nz: { code: 'nz', name: 'New Zealand' },
    ni: { code: 'ni', name: 'Nicaragua' },
    ne: { code: 'ne', name: 'Niger' },
    ng: { code: 'ng', name: 'Nigeria' },
    nu: { code: 'nu', name: 'Niue' },
    nf: { code: 'nf', name: 'Norfolk Island' },
    mp: { code: 'mp', name: 'Northern Mariana Islands' },
    no: { code: 'no', name: 'Norway' },
    om: { code: 'om', name: 'Oman' },
    pk: { code: 'pk', name: 'Pakistan' },
    pw: { code: 'pw', name: 'Palau' },
    ps: { code: 'ps', name: 'Palestinian Territory, Occupied' },
    pa: { code: 'pa', name: 'Panama' },
    pg: { code: 'pg', name: 'Papua New Guinea' },
    py: { code: 'py', name: 'Paraguay' },
    pe: { code: 'pe', name: 'Peru' },
    ph: { code: 'ph', name: 'Philippines' },
    pn: { code: 'pn', name: 'Pitcairn' },
    pl: { code: 'pl', name: 'Poland' },
    pt: { code: 'pt', name: 'Portugal' },
    pr: { code: 'pr', name: 'Puerto Rico' },
    qa: { code: 'qa', name: 'Qatar' },
    re: { code: 're', name: 'Reunion' },
    ro: { code: 'ro', name: 'Romania' },
    ru: { code: 'ru', name: 'Russia' },
    rw: { code: 'rw', name: 'Rwanda' },
    sh: { code: 'sh', name: 'Saint Helena' },
    kn: { code: 'kn', name: 'Saint Kitts and Nevis' },
    lc: { code: 'lc', name: 'Saint Lucia' },
    pm: { code: 'pm', name: 'Saint Pierre and Miquelon' },
    vc: { code: 'vc', name: 'Saint Vincent and the Grenadines' },
    ws: { code: 'ws', name: 'Samoa' },
    sm: { code: 'sm', name: 'San Marino' },
    st: { code: 'st', name: 'Sao Tome and Principe' },
    sa: { code: 'sa', name: 'Saudi Arabia' },
    sn: { code: 'sn', name: 'Senegal' },
    rs: { code: 'rs', name: 'Serbia' },
    me: { code: 'me', name: 'Montenegro' },
    sc: { code: 'sc', name: 'Seychelles' },
    sl: { code: 'sl', name: 'Sierra Leone' },
    sg: { code: 'sg', name: 'Singapore' },
    sk: { code: 'sk', name: 'Slovakia' },
    si: { code: 'si', name: 'Slovenia' },
    sb: { code: 'sb', name: 'Solomon Islands' },
    so: { code: 'so', name: 'Somalia' },
    za: { code: 'za', name: 'South Africa' },
    gs: { code: 'gs', name: 'South Georgia and the South Sandwich Islands' },
    es: { code: 'es', name: 'Spain' },
    lk: { code: 'lk', name: 'Sri Lanka' },
    sd: { code: 'sd', name: 'Sudan' },
    sr: { code: 'sr', name: 'Suriname' },
    sj: { code: 'sj', name: 'Svalbard and Jan Mayen' },
    sz: { code: 'sz', name: 'Swaziland' },
    se: { code: 'se', name: 'Sweden' },
    ch: { code: 'ch', name: 'Switzerland' },
    sy: { code: 'sy', name: 'Syrian Arab Republic' },
    tw: { code: 'tw', name: 'Taiwan, Province of China' },
    tj: { code: 'tj', name: 'Tajikistan' },
    tz: { code: 'tz', name: 'Tanzania' },
    th: { code: 'th', name: 'Thailand' },
    tl: { code: 'tl', name: 'Timor-Leste' },
    tg: { code: 'tg', name: 'Togo' },
    tk: { code: 'tk', name: 'Tokelau' },
    to: { code: 'to', name: 'Tonga' },
    tt: { code: 'tt', name: 'Trinidad and Tobago' },
    tn: { code: 'tn', name: 'Tunisia' },
    tr: { code: 'tr', name: 'Turkey' },
    tm: { code: 'tm', name: 'Turkmenistan' },
    tc: { code: 'tc', name: 'Turks and Caicos Islands' },
    tv: { code: 'tv', name: 'Tuvalu' },
    ug: { code: 'ug', name: 'Uganda' },
    ua: { code: 'ua', name: 'Ukraine' },
    ae: { code: 'ae', name: 'United Arab Emirates' },
    gb: { code: 'gb', name: 'United Kingdom' },
    us: { code: 'us', name: 'United States' },
    um: { code: 'um', name: 'United States Minor Outlying Islands' },
    uy: { code: 'uy', name: 'Uruguay' },
    uz: { code: 'uz', name: 'Uzbekistan' },
    vu: { code: 'vu', name: 'Vanuatu' },
    ve: { code: 've', name: 'Venezuela' },
    vn: { code: 'vn', name: 'Viet Nam' },
    vg: { code: 'vg', name: 'Virgin Islands, British' },
    vi: { code: 'vi', name: 'Virgin Islands, U.S.' },
    wf: { code: 'wf', name: 'Wallis and Futuna' },
    eh: { code: 'eh', name: 'Western Sahara' },
    ye: { code: 'ye', name: 'Yemen' },
    zm: { code: 'zm', name: 'Zambia' },
    zw: { code: 'zw', name: 'Zimbabwe' }
  }

function StartWorldWind() {
    // Create a WorldWindow for the canvas.
    wwd = new WorldWind.WorldWindow("canvasOne");
    // Add some image layers to the WorldWindow's globe.
    layers = [
        // Imagery layers.
        
        {layer: new WorldWind.StarFieldLayer(),enabled: true},
        //{layer: new WorldWind.BMNGLayer(), enabled: true},
        //{layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        //{layer: new WorldWind.BingAerialLayer(null), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        //{layer: new WorldWind.BingRoadsLayer(null), enabled: false},
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
    topPickedObject = pickList.topPickedObject();
    
    if (topPickedObject && topPickedObject.isTerrain) {
       // var pickResult = document.getElementById("pick-result");

       removeOptions(document.getElementById("selectSensor"));
       

       if(!!(document.getElementById("existingThingsSummary"))){
            var existingEl = document.getElementById("existingThingsSummary");
            existingEl.parentNode.removeChild(existingEl);
       }
       // pickResult.textContent = topPickedObject.position;
        
        document.getElementById('startTime').disabled = true;
                document.getElementById('endTime').disabled = true;
                document.getElementById('spanTimeNum').disabled = true;
                document.getElementById('spanTimeUnit').disabled = true;
                document.getElementById('selectSensor').disabled = true;
                document.getElementById('submitStartEndDateTime').disabled = true;

    } else if (topPickedObject) {
        //console.log("element obj id: " +document.getElementById(topPickedObject.userObject.displayName));
        
        

        /*
        var drpDown = document.getElementById('selectSensor');
        if(drpDown.childNodes.length>0){
            for(i=0;i<drpDown.childNodes.length;i++){
                drpDown.removeChild(drpDown.childNodes[i]);
            }   
        }
        */

       removeOptions(document.getElementById("selectSensor"));

        if(topPickedObject.userObject.providerID === "smartcanada"){



        } else if (topPickedObject.userObject.providerID === "opensensemap"){
            
            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }
           
            var sensorListArr = topPickedObject.userObject.sensorList;
            var StrToForm = "Device Name: " +topPickedObject.userObject.displayName+ "<br>";
            var StrToAdd = "";
            for(i=0;i<sensorListArr.length;i++){
                for(var keys in sensorListArr[i]){

                    if(!(keys === "sensorID")){
                        StrToAdd = clone(StrToAdd+""+keys+": " +sensorListArr[i][keys]+ "<br>");
                    }
                   
                }
                var newContent=document.createElement('option');
                newContent.id = "sensorOption"+i;
                newContent.yAxisLabelType = sensorListArr[i].Type;
                newContent.yAxisLabelUnit = sensorListArr[i].Unit;
                newContent.value = sensorListArr[i]["sensorID"];
                newContent.innerHTML = sensorListArr[i].Type;
                document.getElementById('selectSensor').appendChild(newContent);

                StrToAdd = clone(StrToAdd+"<br>");
            }

            StrToForm = clone(StrToForm+StrToAdd);
            var newContent = document.createElement("div");
                newContent.className ="thingsSummary";
                newContent.id = "existingThingsSummary";
                newContent.innerHTML = StrToForm;
                document.getElementById('thingsSummaryID').appendChild(newContent);


                document.getElementById('startTime').disabled = false;
                document.getElementById('endTime').disabled = false;
                document.getElementById('selectSensor').disabled = false;
                document.getElementById('submitStartEndDateTime').disabled = false;

         }  else if (topPickedObject.userObject.providerID === "smartcitizen"){

          

            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

            var prom = QuerySCFeed(topPickedObject.userObject.channelID);

            Promise.all([prom]).then(function(values){

                
                var str_to_form = "Device Name: " +topPickedObject.userObject.displayName+ "<br> Last Seen: "+topPickedObject.userObject.lastSeen+"<br> Provider: Smart Citizen <br><br>";
                //str_to_form = clone(str_to_form+"Last Seen: "+values[0].feeds[0]["created_at"]+"<br><br>");

                document.getElementById('selectSensor').disabled = false;

                for(i=0;i<values[0].data.sensors.length;i++){

                    str_to_form = clone(str_to_form+"Sensor: " +values[0].data.sensors[i].name+"<br> Description: "+values[0].data.sensors[i].description+"<br> Last Value: "+values[0].data.sensors[i].value+" "+values[0].data.sensors[i].unit+"<br><br>");
                    
                    //document.getElementById('selectSensor').options[i] = document.createElement('option').option.values[0].data.sensors[i];
                    //document.getElementById('selectSensor').options[i].text = values[0].data.sensors[i].id;
                    var newContent=document.createElement('option');
                    newContent.id = "sensorOption"+i;
                    
                    newContent.value = values[0].data.sensors[i].id;
                    newContent.innerHTML = values[0].data.sensors[i].name;
                    document.getElementById('selectSensor').appendChild(newContent);
                }


                var newContent = document.createElement("div");
                newContent.id = "existingThingsSummary";
                newContent.className ="thingsSummary";
                newContent.innerHTML = str_to_form;
                
                document.getElementById('thingsSummaryID').appendChild(newContent);

                document.getElementById('startTime').disabled = false;
                document.getElementById('endTime').disabled = false;
                document.getElementById('spanTimeNum').disabled = false;
                document.getElementById('spanTimeUnit').disabled = false;
                document.getElementById('selectSensor').disabled = false;
                document.getElementById('submitStartEndDateTime').disabled = false;
                
               
            });

         } else if (topPickedObject.userObject.providerID === "netherlandssmartemission"){

            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

            var prom = QueryNethSEFeed(topPickedObject.userObject.stationID);

            Promise.all([prom]).then(function(values){
  
                var str_to_form = "Station Name: " +topPickedObject.userObject.displayName+ "<br> Last Seen: "+values[0].feeds[0]["created_at"]+"<br><br>";
                //str_to_form = clone(str_to_form+"Last Seen: "+values[0].feeds[0]["created_at"]+"<br><br>");

                for(i=0;i<values[0].length;i++){

                    str_to_form = clone(str_to_form+"Sensor: " +values[0][i].id+"<br>Description: "+values[0][i].label+"<br> Last Value: "+values[0][i].lastValue.value+" "+values[0][i].uom+"<br><br>");
                   
                }

                var newContent = document.createElement("div");
                newContent.id = "existingThingsSummary";
                newContent.className ="thingsSummary";
                newContent.innerHTML = str_to_form;
                
                document.getElementById('thingsSummaryID').appendChild(newContent);
               
            });

         } else if (topPickedObject.userObject.providerID === "openaq"){
            
            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

            var str_to_form = "Observer Name: " +topPickedObject.userObject.displayName+ "<br><br>";

            for(i=0;i<topPickedObject.userObject.measurements.length;i++){

                str_to_form = clone(str_to_form+"Sensor: " +topPickedObject.userObject.measurements[i].parameter+"<br>Value: "
                +topPickedObject.userObject.measurements[i].value+" "+topPickedObject.userObject.measurements[i].unit+"<br>Last Update: "
                +topPickedObject.userObject.measurements[i].lastUpdated+"<br>Averaging Period: "+topPickedObject.userObject.measurements[i].averagingPeriod.value+
                " "+topPickedObject.userObject.measurements[i].averagingPeriod.unit+
                "<br> Source: " +topPickedObject.userObject.measurements[i].sourceName+"<br><br>");

                
                var newContent=document.createElement('option');
                newContent.id = "sensorOption"+i;
                newContent.value = topPickedObject.userObject.measurements[i].parameter;
                newContent.innerHTML = topPickedObject.userObject.measurements[i].parameter;
                document.getElementById('selectSensor').appendChild(newContent);
               
            }

            var newContent = document.createElement("div");
            newContent.id = "existingThingsSummary";
            newContent.className ="thingsSummary";
            newContent.innerHTML = str_to_form;
            document.getElementById('thingsSummaryID').appendChild(newContent);

           

                document.getElementById('startTime').disabled = false;
                document.getElementById('endTime').disabled = false;
                document.getElementById('selectSensor').disabled = false;
                document.getElementById('submitStartEndDateTime').disabled = false;
           
           
        } else if (topPickedObject.userObject.providerID === "thingspeak"){

            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

            var prom = QueryTSFeed(topPickedObject.userObject.channelID);

            Promise.all([prom]).then(function(values){

                var filt_res={};
                var str_to_form = "Device Name: " +topPickedObject.userObject.displayName+ "<br><br>";
                i=1;
                for(var keys in values[0].channel){
                    
                    if(keys.toLowerCase().indexOf("field")>=0){
                        //console.log(values[0].channel);
                        str_to_form = clone(str_to_form+"Sensor: "+values[0].channel[keys]+"<br> Last Value: "+values[0].feeds[values[0].feeds.length-1][keys]+"<br><br>");

                        //FIXME!!!
                        var newContent=document.createElement('option');
                        newContent.id = "sensorOption"+i;
                        newContent.value = i;
                        newContent.innerHTML = values[0].channel[keys];
                        document.getElementById('selectSensor').appendChild(newContent);
                        i++;
                    }
                }

                str_to_form = clone(str_to_form+"Last Seen: "+values[0].feeds[values[0].feeds.length-1]["created_at"])

                var newContent = document.createElement("div");
                newContent.id = "existingThingsSummary";
                newContent.className ="thingsSummary";
                newContent.innerHTML = str_to_form;
                
                document.getElementById('thingsSummaryID').appendChild(newContent);

                document.getElementById('startTime').disabled = false;
                document.getElementById('endTime').disabled = false;
                document.getElementById('selectSensor').disabled = false;
                document.getElementById('submitStartEndDateTime').disabled = false;
               
            });


         } else if (topPickedObject.userObject.providerID === "smartsantander"){
           // var thSumNameEl = document.getElementById("thingsSummarySmartSantander");

            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

                var newContent = document.createElement("div");
                newContent.id = "existingThingsSummary";
                
                newContent.innerHTML = topPickedObject.userObject.content;
                document.getElementById('thingsSummaryID').appendChild(newContent);
            

        } else {

            

            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

            var newContent = document.createElement("div");
            newContent.id = "existingThingsSummary";
            newContent.className ="thingsSummary";
            newContent.innerHTML= "Device Name: " +topPickedObject.userObject.displayName+ "<br> Last Seen: " +topPickedObject.userObject.lastSeen;
            document.getElementById('thingsSummaryID').appendChild(newContent);

                document.getElementById('startTime').disabled = true;
                document.getElementById('endTime').disabled = true;
                document.getElementById('spanTimeNum').disabled = true;
                document.getElementById('spanTimeUnit').disabled = true;
                document.getElementById('selectSensor').disabled = true;
                document.getElementById('submitStartEndDateTime').disabled = true;
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

            removeOptions(document.getElementById("selectSensor"));
            /*
            var drpDown = document.getElementById('selectSensor');

            if(drpDown.childNodes.length>0){
                for(i=0;i<drpDown.childNodes.length;i++){
                    drpDown.removeChild(drpDown.childNodes[i]);
                }   
            }
            */

            if(!!(document.getElementById("existingThingsSummary"))){
                var existingEl = document.getElementById("existingThingsSummary");
                existingEl.parentNode.removeChild(existingEl);
            }

            //var pickResult = document.getElementById("pick-result");
            //pickResult.textContent = "Nothing Selected";
            //pickResult.cursor = "default";

            document.getElementById('startTime').disabled = true;
                document.getElementById('endTime').disabled = true;
                document.getElementById('spanTimeNum').disabled = true;
                document.getElementById('spanTimeUnit').disabled = true;
                document.getElementById('submitStartEndDateTime').disabled = true;
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
    wwd.addEventListener("click", handlePick);
    //wwd.addEventListener("mousemove", handleMove);

    var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);
    //window.addEventListener("scroll", updatePosition, false);
    //window.addEventListener("resize", updatePosition, false);
    
}


//get eye view distance from the globe, output in meters.
function getViewingRange(){
    return wwd.navigator.range;
}


async function CreateWWDIoTRadialMark(ThingsLocationArr){
    
    placemarkLayerAllDev.removeAllRenderables();

    allThingsDB = clone(ThingsLocationArr);
    // Set placemark attributes.
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
    //placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
    //placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node.png";
    placemarkAttributes.imageSource = "images/thing_node.png";
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
    highlightAttributes.imageScale = 0.3;
    //highlightAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node_highlight.png";
    highlightAttributes.imageSource = "images/thing_node_highlight.png";
    
    highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);
    highlightAttributes.applyLighting = false;

    placemarkLayerAllDev = new WorldWind.RenderableLayer("Things Placemark");

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
        } else if(ThingsLocationArr[i].providerID === "opensensemap"){
            placemark.sensorList = ThingsLocationArr[i].sensorList;
            placemark.channelID = ThingsLocationArr[i].channelID;
            
        } else if(ThingsLocationArr[i].providerID === "openaq"){
            placemark.measurements = ThingsLocationArr[i].measurements;
            
        } else if(ThingsLocationArr[i].providerID === "netherlandssmartemission"){
            placemark.stationID = ThingsLocationArr[i].stationID;
            placemark.lastSeen = ThingsLocationArr[i].lastSeen;
        } else if(ThingsLocationArr[i].providerID === "thingspeak"){
            placemark.channelID = ThingsLocationArr[i].id;
            placemark.description = ThingsLocationArr[i].description;
            
        } else if(ThingsLocationArr[i].providerID === "smartcitizen"){
            placemark.channelID = ThingsLocationArr[i].deviceID;
            placemark.lastSeen = ThingsLocationArr[i].lastSeen;
            
        } else {
            placemark.lastSeen = ThingsLocationArr[i].lastSeen;
        }


        // Create the renderable layer for placemarks.
        
        
        // Add the placemark to the layer.
        placemarkLayerAllDev.addRenderable(placemark);
       

    }

    // Add the placemarks layer to the WorldWindow's layer list.
    wwd.addLayer(placemarkLayerAllDev);
    // Now set up to handle highlighting.
    var highlightController = new WorldWind.HighlightController(wwd);

    EnableSearchByLocation();

}

  async function SearchLocationWithArrEl(query,arrayEl) {    
    
    var self = this;
    self.geocoder = new WorldWind.NominatimGeocoder();
   // self.goToAnimator = new WorldWind.GoToAnimator(wwd);

      var queryString = query;
      if (queryString) {
        var latitude, longitude;
        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
          var tokens = queryString.split(",");
          latitude = parseFloat(tokens[0]);
          longitude = parseFloat(tokens[1]);
          arrayEl.latitude = latitude;
          arrayEl.longitude = longitude;
          
          //self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
        } else {
          self.geocoder.lookup(queryString, function(geocoder, result) {
            if (result.length > 0) {
              latitude = parseFloat(result[0].lat);
              longitude = parseFloat(result[0].lon);
              arrayEl.latitude = latitude;
              arrayEl.longitude = longitude;
              //self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
            }
          });
        }
      }

      return arrayEl;
  }

  async function SearchLocation(query) {    
    
    var latlonJS={};
    var self = this;
    self.geocoder = new WorldWind.NominatimGeocoder();
   // self.goToAnimator = new WorldWind.GoToAnimator(wwd);

      var queryString = query;
      if (queryString) {
        var latitude, longitude;
        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
          var tokens = queryString.split(",");
          latitude = parseFloat(tokens[0]);
          longitude = parseFloat(tokens[1]);
          latlonJS.latitude = latitude;
          latlonJS.longitude = longitude;
          
          //self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
        } else {
          self.geocoder.lookup(queryString, function(geocoder, result) {
            if (result.length > 0) {
              latitude = parseFloat(result[0].lat);
              longitude = parseFloat(result[0].lon);
              latlonJS.latitude = latitude;
              latlonJS.longitude = longitude;
              //self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
            }
          });
        }
      }

      return latlonJS;
  }

  function GlobeMoveToLocation(query) {
    var self = this;
    self.geocoder = new WorldWind.NominatimGeocoder();
    self.goToAnimator = new WorldWind.GoToAnimator(wwd);

      var queryString = query;
      if (queryString) {
        var latitude, longitude;
        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
          var tokens = queryString.split(",");
          latitude = parseFloat(tokens[0]);
          longitude = parseFloat(tokens[1]);
          self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
        } else {
          self.geocoder.lookup(queryString, function(geocoder, result) {
            if (result.length > 0) {
                latitude = parseFloat(result[0].lat);
                longitude = parseFloat(result[0].lon);
              self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
            }
          });
        }
      }
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

  function GlobeMoveToLocationAndZoom(query) {
    var self = this;
    self.geocoder = new WorldWind.NominatimGeocoder();
    self.goToAnimator = new WorldWind.GoToAnimator(wwd);

      var queryString = query;
      if (queryString) {
        var latitude, longitude;
        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
          var tokens = queryString.split(",");
          latitude = parseFloat(tokens[0]);
          longitude = parseFloat(tokens[1]);
          self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude),IncrementalGlobeSetViewRange([50000]));
          
        } else {
          self.geocoder.lookup(queryString, function(geocoder, result) {
            if (result.length > 0) {
              latitude = parseFloat(result[0].lat);
              longitude = parseFloat(result[0].lon);
              self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude),IncrementalGlobeSetViewRange([50000]));
             
            }
          });
        }
       
     }
  }

  function GlobeSetViewRange(range){
    wwd.navigator.range = range;
    wwd.redraw();
  }

  function IncrementalGlobeSetViewRange(range_arr){

      for(i=0;i<range_arr.length;i++){
        wwd.navigator.range = range_arr[i];
        wwd.redraw();
      }
  }

 function SearchButtonTrig(){
     var queryIn = document.getElementById("searchText").value;
     GlobeMoveToLocationAndZoom(queryIn);
 }


/*
 async function OrigQuerySCHistoricalData(){

	// example: var url = "https://api.smartcitizen.me/v0/devices/3773/readings?sensor_id=14&rollup=1h&from=2018-02-05&to=2018-04-18";

    
	var channelID = topPickedObject.userObject.channelID;

	var params = {
        "sensor_id" : document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
        "rollup": document.getElementById("spanTimeNum").value+document.getElementById("spanTimeUnit").options[(document.getElementById("spanTimeUnit")).selectedIndex].value,
        "from": document.getElementById("startTime").value,
        "to": document.getElementById("endTime").value
	}

	var url = "https://api.smartcitizen.me/v0/devices/"+channelID+"/readings"+toHtmlQuery_(params);

    

    var url = "https://api.smartcitizen.me/v0/devices/3773/readings?sensor_id=14&rollup=1h&from=2018-02-05&to=2018-04-18";

	var prom = fetch(url).then(function(response) {
		if (!response.ok) {
			EnableSearchButton();
			throw Error(response.statusText);
		}
		return response.json()});

		var prom2 = Promise.all([prom]).then(function(values){
			return values[0];
        });
        
        return prom2;
}
*/

function TrigHistorical(){
    if(topPickedObject.userObject.providerID === "smartcitizen"){
        //var promSC = QuerySCHistoricalData();

        //Promise.all([promSC]).then(function(values){
            //copyToPass = clone(values[0]);
            //console.log(copyToPass);
            /*
            var params = {
                "providerID" : "smartcitizen",
                "channelID": 3773,
                "sensor_id" : 14,//document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
                "rollup": "4h",//document.getElementById("spanTimeNum").value+document.getElementById("spanTimeUnit").options[(document.getElementById("spanTimeUnit")).selectedIndex].value,
                "from": "2018-02-05",//document.getElementById("startTime").value.getUTCFullYear()+"-"+document.getElementById("startTime").value.getUTCMonth()+"-"+document.getElementById("startTime").value.getUTCDate(),
                "to": "2018-04-18"//document.getElementById("endTime").value.getUTCFullYear()+"-"+document.getElementById("endTime").value.getUTCMonth()+"-"+document.getElementById("endTime").value.getUTCDate()
            }
            window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
            */
           var params = {
                "providerID" : "smartcitizen",
                "channelID": topPickedObject.userObject.channelID,
                "sensor_id" : document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
                "rollup": document.getElementById("spanTimeNum").value+document.getElementById("spanTimeUnit").options[(document.getElementById("spanTimeUnit")).selectedIndex].value,
                "from":  new Date(document.getElementById("startTime").value).getUTCFullYear()+"-"+new Date(document.getElementById("startTime").value).getUTCMonth()+"-"+ new Date(document.getElementById("startTime").value).getUTCDate(),
                "to":  new Date(document.getElementById("endTime").value).getUTCFullYear()+"-"+ new Date(document.getElementById("endTime").value).getUTCMonth()+"-"+new Date(document.getElementById("endTime").value).getUTCDate()
            }
            window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
        //});
        } else
    if (topPickedObject.userObject.providerID === "opensensemap"){
        /*
        var params = {
            "providerID" : "opensensemap",
            "yAxisLabel" : "unit",
            "channelID" : "5a95a44cbc2d4100193f7b40",
            "sensorID" :"5a95a44cbc2d4100193f7b46",//document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
            "from-date": "2018-02-19T17:21:07.090Z",//document.getElementById("startTime").value.toISOString(),
            "to-date": "2018-04-19T17:21:07.090Z"//document.getElementById("endTime").value.toISOString()
        }
        window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
        */
            var params = {
                "providerID" : "opensensemap",
                "yAxisLabelType" : document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].yAxisLabelType,
                "yAxisLabelUnit" : document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].yAxisLabelUnit,
                "channelID" : topPickedObject.userObject.channelID,
                "sensorID" : document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
                "from-date": new Date(document.getElementById("startTime").value).toISOString(),
                "to-date": new Date(document.getElementById("startTime").value).toISOString()
            }
            window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
    }  else if (topPickedObject.userObject.providerID === "openaq"){
        /*
        var params = {
            "providerID" : "openaq",
            "parameter": "pm25",
            "location" : "Sveavägen",//document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
            "date-from": "2018-02-19T17:21:07.090Z",//document.getElementById("startTime").value.toISOString(),
            "date-to": "2018-04-19T17:21:07.090Z"//document.getElementById("endTime").value.toISOString()
        }
        window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
        */

        
        var params = {
            "providerID" : "openaq",
            "parameter": document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
            "location" : topPickedObject.userObject.displayName,//document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
            "date-from": new Date(document.getElementById("startTime").value).toISOString(),
            "limit": "10000",
            "date-to": new Date(document.getElementById("endTime").value).toISOString()
        }
        window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
        
    //} else if (topPickedObject.userObject.providerID === "thingspeak"){
     } else if (topPickedObject.userObject.providerID === "thingspeak"){

            var params={
                "providerID" : "thingspeak",
                "channelID" : topPickedObject.userObject.channelID,
                "results": "8000",
                "fieldID": document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
                "start": new Date(document.getElementById("startTime").value).toISOString(),
                "end" : new Date(document.getElementById("startTime").value).toISOString()
            }

            window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
        } else {
            window.alert("Historical data is not made available by the IoT data provider of the selected devices/sensors");
        }
        /*
        var params = {
            "providerID" : "thingspeak",
            "channelID" : "408176",
            "fieldID" :"2",//document.getElementById("selectSensor").options[(document.getElementById("selectSensor")).selectedIndex].value,
            "start": "2018-02-19T17:21:07.090Z",//document.getElementById("startTime").value.toISOString(),
            "end": "2018-04-19T17:21:07.090Z"//document.getElementById("endTime").value.toISOString()
        }
        window.open("http://gaiota.ddns.net/visualization.html"+toHtmlQuery_(params));
        */
    //}else {
            //window.alert("Historical data is not made available by the providers");
    //}
}

function FetchDataToPass(){
    return clone(copyToPass);
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function TrigSearchByCountryAndDraw(){

    DisableSearchByLocation();
    DisableReturnAllDevices();

    var prom = SearchByCountryAndDraw();

    Promise.all([prom]).then(function(values){

        EnableSearchByLocation();
        EnableReturnAllDevices();
    });


}

function TrigSearchByCityAndDraw(){

    DisableSearchByLocation();
    DisableReturnAllDevices();

    var prom = SearchByCityAndDraw();

    Promise.all([prom]).then(function(values){

        EnableSearchByLocation();
        EnableReturnAllDevices();
    });
}


async function SearchByCountryAndDraw(){

    

    wwd.removeLayer(placemarkLayerAllDev);
    wwd.removeLayer(placemarkLayerDevByLoc);

     placemarkLayerDevByLoc.removeAllRenderables();
      // Set placemark attributes.
      var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
      //placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
      //placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node.png";
      placemarkAttributes.imageSource = "images/thing_node.png";
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
      highlightAttributes.imageScale = 0.3;
      //highlightAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node_highlight.png";
      highlightAttributes.imageSource = "images/thing_node_highlight.png";
      
      highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);
      highlightAttributes.applyLighting = false;
  
      placemarkLayerDevByLoc = new WorldWind.RenderableLayer("Things Placemark");

          // Create the renderable layer for placemarks.
          
          
          // Add the placemark to the layer.
         
          //placemarkLayer.addRenderable(placemark);
  
      
  
      // Add the placemarks layer to the WorldWindow's layer list.
     
      // Now set up to handle highlighting.
      var highlightController = new WorldWind.HighlightController(wwd);
    
    
    var queryLocBy = document.getElementById("selectByCountry").options[document.getElementById("selectByCountry").selectedIndex].value;

            for(i=0;i<allThingsDB.length;i++){
                if(!!(allThingsDB[i].country)){
                   // console.log(countrycodeJS);
                    console.log(allThingsDB[i].country);
                    console.log(countrycodeJS[(allThingsDB[i].country.toLowerCase())]);
                    if(countrycodeJS[(allThingsDB[i].country.toLowerCase())].name == queryLocBy.toLowerCase()){
                        
                        var lat = parseFloat(allThingsDB[i].latitude);
                        var lon = parseFloat(allThingsDB[i].longitude);
                
                        // Create the placemark with the attributes defined above.
                        var placemarkPosition = new WorldWind.Position(lat, lon, 0);
                        var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
                        // Draw placemark at altitude defined above.
                        placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
                        // Assign highlight attributes for the placemark.
                        placemark.highlightAttributes = highlightAttributes;
                        placemark.displayName = allThingsDB[i].name;
                        placemark.providerID = allThingsDB[i].providerID;
                        
                
                        if(allThingsDB[i].providerID === "smartsantander"){
                            placemark.content = allThingsDB[i].content;
                        } else if(allThingsDB[i].providerID === "opensensemap"){
                            placemark.sensorList = allThingsDB[i].sensorList;
                            placemark.channelID = allThingsDB[i].channelID;
                            
                        } else if(allThingsDB[i].providerID === "openaq"){
                            placemark.measurements = allThingsDB[i].measurements;
                            
                        } else if(allThingsDB[i].providerID === "netherlandssmartemission"){
                            placemark.stationID = allThingsDB[i].stationID;
                            placemark.lastSeen = allThingsDB[i].lastSeen;
                        } else if(allThingsDB[i].providerID === "thingspeak"){
                            placemark.channelID = allThingsDB[i].id;
                            placemark.description = allThingsDB[i].description;
                            
                        } else if(allThingsDB[i].providerID === "smartcitizen"){
                            placemark.channelID = allThingsDB[i].deviceID;
                            placemark.lastSeen = allThingsDB[i].lastSeen;
                            
                        } else {
                            placemark.lastSeen = allThingsDB[i].lastSeen;
                        }

                    }
                    placemarkLayerDevByLoc.addRenderable(placemark);
                } else {

                }
            }
            
        wwd.addLayer(placemarkLayerDevByLoc);
        var highlightController = new WorldWind.HighlightController(wwd);
       
}

async function SearchByCityAndDraw(){


    wwd.removeLayer(placemarkLayerAllDev);
    wwd.removeLayer(placemarkLayerDevByLoc);

    placemarkLayerDevByLoc.removeAllRenderables();
      // Set placemark attributes.
      var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
      //placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
      //placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node.png";
      placemarkAttributes.imageSource = "images/thing_node.png";
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
      highlightAttributes.imageScale = 0.3;
      //highlightAttributes.imageSource = WorldWind.configuration.baseUrl + "images/thing_node_highlight.png";
      highlightAttributes.imageSource = "images/thing_node_highlight.png";
      
      highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);
      highlightAttributes.applyLighting = false;
  
      placemarkLayerDevByLoc = new WorldWind.RenderableLayer("Things Placemark");
  
         
  
  
          // Create the renderable layer for placemarks.
          
          
          // Add the placemark to the layer.
         
          //placemarkLayer.addRenderable(placemark);
  
      
  
      // Add the placemarks layer to the WorldWindow's layer list.
     
      // Now set up to handle highlighting.
      var highlightController = new WorldWind.HighlightController(wwd);

    
    var queryString = document.getElementById("searchByCity").value;

        for(i=0;i<allThingsDB.length;i++){
            if(allThingsDB[i].city){
                if(allThingsDB[i].city.toLowerCase() === queryString.toLowerCase()){
                    
                    var lat = parseFloat(allThingsDB[i].latitude);
                    var lon = parseFloat(allThingsDB[i].longitude);
            
                    // Create the placemark with the attributes defined above.
                    var placemarkPosition = new WorldWind.Position(lat, lon, 0);
                    var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
                    // Draw placemark at altitude defined above.
                    placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
                    // Assign highlight attributes for the placemark.
                    placemark.highlightAttributes = highlightAttributes;
                    placemark.displayName = allThingsDB[i].name;
                    placemark.providerID = allThingsDB[i].providerID;
                    
            
                    if(allThingsDB[i].providerID === "smartsantander"){
                        placemark.content = allThingsDB[i].content;
                    } else if(allThingsDB[i].providerID === "opensensemap"){
                        placemark.sensorList = allThingsDB[i].sensorList;
                        placemark.channelID = allThingsDB[i].channelID;
                        
                    } else if(allThingsDB[i].providerID === "openaq"){
                        placemark.measurements = allThingsDB[i].measurements;
                        
                    } else if(allThingsDB[i].providerID === "netherlandssmartemission"){
                        placemark.stationID = allThingsDB[i].stationID;
                        placemark.lastSeen = allThingsDB[i].lastSeen;
                    } else if(allThingsDB[i].providerID === "thingspeak"){
                        placemark.channelID = allThingsDB[i].id;
                        placemark.description = allThingsDB[i].description;
                        
                    } else if(allThingsDB[i].providerID === "smartcitizen"){
                        placemark.channelID = allThingsDB[i].deviceID;
                        placemark.lastSeen = allThingsDB[i].lastSeen;
                        
                    } else {
                        placemark.lastSeen = allThingsDB[i].lastSeen;
                    }
                   

                }
                placemarkLayerDevByLoc.addRenderable(placemark);
            } else {
                
            }
        }

        wwd.addLayer(placemarkLayerDevByLoc);
        var highlightController = new WorldWind.HighlightController(wwd);
    
}

function DisableSearchByLocation(){
	document.getElementById("SearchByCountryButton").style.color = "gray";
    document.getElementById("SearchByCountryButton").disabled = true;
    document.getElementById("SearchByCountryButton").innerHTML = "Search In Progress...";

    document.getElementById("SearchByCityButton").style.color = "gray";
    document.getElementById("SearchByCityButton").disabled = true;
    document.getElementById("SearchByCityButton").innerHTML = "Search In Progress...";
 }

 function EnableSearchByLocation(){
	document.getElementById("SearchByCountryButton").style.color = "black";
    document.getElementById("SearchByCountryButton").disabled = false;
    document.getElementById("SearchByCountryButton").innerHTML = "Search By Country";

    document.getElementById("SearchByCityButton").style.color = "black";
    document.getElementById("SearchByCityButton").disabled = false;
    document.getElementById("SearchByCityButton").innerHTML = "Search By City";
 }




 function DisableReturnAllDevices(){
	document.getElementById("ReturnAllDevices").style.color = "gray";
    document.getElementById("ReturnAllDevices").disabled = true;

 }

 function EnableReturnAllDevices(){
	document.getElementById("ReturnAllDevices").style.color = "black";
    document.getElementById("ReturnAllDevices").disabled = false;
 }


 
// reference, not in actual file to save time from parsing
 
  