// making a map and tiles
// const myMap = L.map("iss-map", { zoomControl: false }).setView([0, 0], 1);
const myMap = L.map("iss-map", {
  zoomControl: false,
  dragging: false,
}).fitWorld();
const myMapZoomed = L.map("iss-map-zoomed", {
  zoomControl: false,
  dragging: false,
}).setView([0, 0], 5);

const attribution =
  "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
const tilesZoomed = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);
tilesZoomed.addTo(myMapZoomed);

// making a marker with ISS icon
const issIcon = L.icon({
  iconUrl: "./iss200px.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const issIconZoomed = L.icon({
  iconUrl: "./iss200px.png",
  iconSize: [100, 64],
  iconAnchor: [50, 32],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);
const markerZoomed = L.marker([0, 0], { icon: issIconZoomed }).addTo(
  myMapZoomed
);

// API url for fetch data in JSON format
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude, velocity } = data;
  document.getElementById("lat").textContent = latitude.toFixed(3);
  document.getElementById("lon").textContent = longitude.toFixed(3);
  document.getElementById("vel").textContent =
    Math.round(velocity).toLocaleString() + " km/h";

  marker.setLatLng([latitude, longitude]);
  markerZoomed.setLatLng([latitude, longitude]);
  myMapZoomed.panTo([latitude, longitude]);

  // console.log(data);
}

function stopRefreshing() {
  clearInterval(intervId);
}

getISS();
const stopBtn = document.getElementById("stop-btn");
stopBtn.addEventListener("click", stopRefreshing);
const intervId = setInterval(getISS, 5000);
