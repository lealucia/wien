/* Vienna Sightseeing Beispiel */
// wenn ich .addTo(map) mache, ist es direkt aktiv; wenn ich das weglasse, ist overlay noch nicht aktiv

// Stephansdom Objekt
let stephansdom = {
  lat: 48.208493,
  lng: 16.373118,
  title: "Stephansdom",
};

// Karte initialisieren
let map = L.map("map").setView([stephansdom.lat, stephansdom.lng], 12);

// BasemapAT Layer mit Leaflet provider plugin als startLayer Variable
let startLayer = L.tileLayer.provider("BasemapAT.grau");
startLayer.addTo(map);


//als erstes muss ich hier den neuen definieren
let themaLayer = {
 sights: L.featureGroup(),
 lines: L.featureGroup(),
 stops: L.featureGroup(),
 hotels: L.featureGroup(),
 zones: L.featureGroup ().addTo(map),

}
//dann hier auch wieder hinzufügen

// Hintergrundlayer (auf Leaflet gibt es viele vers. Karten -> kann man hier reinfügen// erste Beschreibung in "..." steht dann auf website)
L.control
  .layers({
    "BasemapAT Grau": startLayer,
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT Beschriftung": L.tileLayer.provider("BasemapAT.overlay"),
    "Topomap": L.tileLayer.provider("OpenTopoMap"),
  }, {
    "Sehenswürdigkeiten":themaLayer.sights,   
    "Vienna Sightseeing Linien": themaLayer.lines,
    "Vienna Sightseeing Stops": themaLayer.stops,
    "Vienna Hotels": themaLayer.hotels,
    "Vienna Zones": themaLayer.zones
  })
  .addTo(map);


// Maßstab
L.control
  .scale({
    imperial: false,
  })
  .addTo(map);

  // Fullscreen Map

  L.control.fullscreen().addTo(map);

// hier müssen jetzt Parameter rein von wo wir die Daten holen

  async function loadSights(url) {
    console.log ("Loading", url)
    let response= await fetch(url);    // ACHTUNG! Da Sachen aus dem Internet manchmal länger herunterladen, muss ich das beachten beim skript. ich muss async vor function hinzufügen 
    let geojson= await response.json(); // nachdem das Download fertig ist, lad ich es damit rein --> in der Variable, hab ich dann alles was vom Server geladen werden soll
   console.log(geojson)
   L.geoJSON(geojson, {
    onEachFeature: function (feature, layer) {
      console.log(feature);
      console.log(feature.properties.NAME);
      layer.bindPopup (`
      <img src="${feature.properties.THUMBNAIL}" alt= "*">
      <h4><a href=${feature.properties.WEITERE_INF}"  
       target= "wien">${feature.properties.NAME} </h4>
      <address>${feature.properties.ADRESSE} </address>      
      `);
    }
   }).addTo (themaLayer.sights); // hier werden sie jetzt in die Karte geladen
  }
   loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json")

// Hier für Buslinien 
   async function loadlines(url) {
    console.log ("Loading", url)
    let response= await fetch(url);    // ACHTUNG! Da Sachen aus dem Internet manchmal länger herunterladen, muss ich das beachten beim skript. ich muss async vor function hinzufügen 
    let geojson= await response.json(); // nachdem das Download fertig ist, lad ich es damit rein --> in der Variable, hab ich dann alles was vom Server geladen werden soll
   console.log(geojson)
   L.geoJSON(geojson, {
    onEachFeature: function (feature, layer) {
      console.log(feature);
      console.log(feature.properties.NAME);
      layer.bindPopup (`
      <h4><i class= "fa-solid fa-bus"></i> ${feature.properties.LINE_NAME}</h4>
      <adress> <i class="fa-regular fa-circle-stop"> </i>${feature.properties.FROM_NAME}</adress><br>
      <i class="fa-solid fa-arrow-down"></i><br>
      <adress><i class="fa-regular fa-circle-stop"> </i>${feature.properties.TO_NAME}</adress>
      `);
    }
   }).addTo (themaLayer.lines); // hier werden sie jetzt in die Karte geladen
  }
   loadlines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json")

//Hier für Stops

async function loadstops(url) {
  console.log ("Loading", url)
  let response= await fetch(url);    // ACHTUNG! Da Sachen aus dem Internet manchmal länger herunterladen, muss ich das beachten beim skript. ich muss async vor function hinzufügen 
  let geojson= await response.json(); // nachdem das Download fertig ist, lad ich es damit rein --> in der Variable, hab ich dann alles was vom Server geladen werden soll
 console.log(geojson)
 L.geoJSON(geojson, {
  onEachFeature: function (feature, layer) {
    console.log("stops",feature);
    console.log(feature.properties.NAME);
    layer.bindPopup (`
    <h4><i class= "fa-solid fa-bus"></i> ${feature.properties.LINE_NAME}</h4>
    <adress> ${feature.properties.STAT_ID}</adress> <adress> ${feature.properties.STAT_NAME}</adress><br>
   
    
    `);
  }
 }).addTo (themaLayer.stops); // hier werden sie jetzt in die Karte geladen
}
 loadstops("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json")
 
 //Hier für Hotels

 async function loadshotels(url) {
  console.log ("Loading", url)
  let response= await fetch(url);    // ACHTUNG! Da Sachen aus dem Internet manchmal länger herunterladen, muss ich das beachten beim skript. ich muss async vor function hinzufügen 
  let geojson= await response.json(); // nachdem das Download fertig ist, lad ich es damit rein --> in der Variable, hab ich dann alles was vom Server geladen werden soll
 console.log(geojson)
 L.geoJSON(geojson, {
  onEachFeature: function (feature, layer) {
    console.log(feature);
    console.log(feature.properties.NAME);
    layer.bindPopup (`
    <h3> ${feature.properties.BETRIEB}</h3>
    <h4> ${feature.properties.BETRIEBSART_TXT} (${feature.properties.KATEGORIE_TXT})</h4>
    <hr>
    Addr.: ${feature.properties.ADRESSE}<br>
    Tel.: <a href="tel: ${feature.properties.KONTAKT_TEL}"> ${feature.properties.KONTAKT_TEL} </a> <br>
    E-Mail: <a href= "E-Mail: ${feature.properties.KONTAKT_EMAIL}" > "${feature.properties.WEBLINK1}"> </a> 
   <br>
    Homepage</a>
    `);
  }
 }).addTo (themaLayer.hotels); // hier werden sie jetzt in die Karte geladen
}
 loadshotels("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:UNTERKUNFTOGD&srsName=EPSG:4326&outputFormat=json")


 //Hier fußgängerzone

 async function loadzones(url) {
  console.log ("Loading", url)
  let response= await fetch(url);    // ACHTUNG! Da Sachen aus dem Internet manchmal länger herunterladen, muss ich das beachten beim skript. ich muss async vor function hinzufügen 
  let geojson= await response.json(); // nachdem das Download fertig ist, lad ich es damit rein --> in der Variable, hab ich dann alles was vom Server geladen werden soll
 console.log(geojson)
 L.geoJSON(geojson, {
  onEachFeature: function (feature, layer) {
    console.log(feature);
    console.log(feature.properties.NAME);
    layer.bindPopup (`
    <h4> Fußgängerzone ${feature.properties.ADRESSE} </h4>
    <i class="fa-regular fa-clock"></i> ${feature.properties.ZEITRAUM }  || "ohne Ausnahme" <br><br>
    <i class="fa-solid fa-circle-info"></i> ${feature.properties.AUSN_TEXT}
    `);
  }
 }).addTo (themaLayer.zones); // hier werden sie jetzt in die Karte geladen
}
 loadzones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json")


// Touristische Kraftfahrlinien (loadlines) overlay= lines
//Touristische Kraftfahrlinien Haltestelle (loadstops) overlay= stops
//Fußgängerzonen Wien (loadZones) overlay= zones
//Hotels und Unterkünfte overlay= hotels