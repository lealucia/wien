/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
  lat: 48.208493,
  lng: 16.373118,
  title: "Stephansdom",
};
/* Geschwungene Klammer = Objekt */ 

// Karte initialisieren
let map = L.map("map").setView([stephansdom.lat, stephansdom.lng], 12);

// BasemapAT Layer mit Leaflet provider plugin als startLayer Variable
let startLayer = L.tileLayer.provider("BasemapAT.grau");
startLayer.addTo(map);

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
    
  })
  .addTo(map);

// Marker Stephansdom
L.marker([stephansdom.lat, stephansdom.lng])
  .addTo(map)
  .bindPopup(stephansdom.title)
  .openPopup();

// Maßstab
L.control
  .scale({
    imperial: false,
  })
  .addTo(map);

  // Fullscreen Map

  L.control.fullscreen().addTo(map);//#endregion


   // function addiere (zahl1, zahl2) {
   // let summe = zahl1+ zahl2;
   // console.log("Summe: ",summe);
   //}

   //addiere (4, 7);


// hier müssen jetzt Parameter rein von wo wir die Daten holen

  async function loadSights(url) {
    console.log ("Loading", url)
    let response= await fetch(url);    // ACHTUNG! Da Sachen aus dem Internet manchmal länger herunterladen, muss ich das beachten beim skript. ich muss async vor function hinzufügen 
    let geojson= await response.json(); // nachdem das Download fertig ist, lad ich es damit rein --> in der Variable, hab ich dann alles was vom Server geladen werden soll
   console.log(geojson)
   L.geoJSON(geojson).addTo (map); // hier werden sie jetzt in die Karte geladen
  }
   loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json")

   

