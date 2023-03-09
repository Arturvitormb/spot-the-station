//URL da api WhereTheISS

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//Cria o ícone do mapa com uma imagem da ISS.

var myIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png',
    iconSize: [200, 95],
    iconAnchor: [90, 30],
    popupAnchor: [-10, -10],
});

// Cria o mapa

var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wheretheiss.at/" target="_blank">Where the ISS at?</a> | Arturvitormb'
}).addTo(map);

// Cria o marcador para o mapa

var marker = L.marker([0, 0], {icon: myIcon}).addTo(map)
    .bindPopup('Aqui está a ISS.')

//Pega a posição da ISS

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json(); 

    // Separa a latitude e longitude da data obtida da api
    const {latitude, longitude} = data;

    // Manda a latitude e longitude para os <span>
    document.getElementById('lat').textContent = latitude.toFixed(2) + "°";
    document.getElementById('lon').textContent = longitude.toFixed(2) + "°";

    // Manda a latitude e longitude para o map e marker
    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude]);

}

// Aciona a função getISS() a cada 1 segundo

setInterval(getISS, 1000); 