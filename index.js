var ipAddress = document.getElementById("ip_address");
var submitBtn = document.getElementById("search_btn");
var apiKey = "at_HWXtqVbj9kuwXDj40ywmqbQvFPkL3";

var currentIp = document.querySelector("#current_ip");
var currentTown = document.querySelector("#current_town");
var currentZone = document.querySelector("#current_zone");
var currentIsp = document.querySelector("#current_isp");



submitBtn.addEventListener("click", action);

ipAddress.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        action();
    }
});

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var ipUrl = "https://geo.ipify.org/api/v2/country?apiKey=" +apiKey;

fetch(ipUrl)
    .then((response) => response.json())
    .then((response) => {

        var ipAddressValue = response.ip;
        
        var url = "https://ipapi.co/" + ipAddressValue + "/json/";

        fetch(url)
        .then((results) => results.json())
        .then((results) => {
  
        currentIp.innerHTML = results.ip;
        currentTown.innerHTML = results.city + ", " + results.region + " " + results.city;
        currentZone.innerHTML = "UTC" + results.utc_offset;
        currentIsp.innerHTML = results.org;
        
        lat = results.latitude;
        lng = results.longitude;
        
        mapLocation(lat, lng);
        
        }).catch(error => console.log(error))

}).catch(error => console.log(error))



function mapLocation(lat, lng){
    var markerIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    
        iconSize: [46, 56], // size of the icon
        iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
    });

    map.setView([lat, lng], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map)
}


function action(){

    url = "https://ipapi.co/" + ipAddress.value + "/json/";

    fetch(url)
    .then((response) => response.json())
    .then((response) => {
        currentIp.innerHTML = response.ip;
        currentTown.innerHTML = response.city + ", " + response.region + ", " + response.country;
        currentZone.innerHTML = "UTC" + response.utc_offset;
        currentIsp.innerHTML = response.org;

        var lat = response.latitude;
        var lng = response.longitude;

        mapLocation(lat, lng);

      }).catch(error => console.log(error))

};





























// pull from different file
// const secret_api ='at_HWXtqVbj9kuwXDj40ywmqbQvFPkL3'
// // const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
// const api_uri = 'https://geo.ipify.org/api/'
// let current_verion = 'v2'

// // elements to update 
// let current_ip = document.getElementById('current_ip')
// let current_town = document.getElementById('current_town')
// let current_zone = document.getElementById('current_zone')
// let current_isp = document.getElementById('current_isp')

// // form elements 
// const entered_ip = document.getElementById('ip_address') 
// const search_btn = document.getElementById('search_btn')

// // const headers_option = {
// //     headers: {
// //         'Access-Control-Allow-Origin': '*',
// //     }
// // }

// const map = L.map('map', {
//     'center': [0,0],
//     'zoom': 0,
//     'layers': [
//         L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           })
//     ]
// })

// updateMarker = (update_marker = [-33.665, 18.993]) => {
//     map.setView(update_marker, 13);
//     L.marker(update_marker).addTo(map);
// }

// getIPDetails = (default_ip) => {
//     if(default_ip == undefined){
//         var ip_url = `${api_uri}${current_verion}?apiKey=${secret_api}`
//     }
//     else {
//         var ip_url = `${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${default_ip}`
//     }
//     fetch(ip_url)
//     .then( results => results.json())
//     .then( data => {
//         current_ip.innerHTML = data.ip
//         current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
//         current_zone.innerHTML = data.location.timezone
//         current_isp.innerHTML = data.isp

//         // update map marker 
//         updateMarker([data.location.lat, data.location.lng])
//     })
//     .catch(error => {
//         alert("Unable to get IP details")
//         console.log(error)
//     })
// }

// document.addEventListener('load', updateMarker())

// search_btn.addEventListener('click', e => {
//     e.preventDefault()
//     if (entered_ip.value != '' && entered_ip.value != null) {
//         getIPDetails(entered_ip.value)
//         return
//     }
//     alert("Please enter a valid IP address");
// })


















































// var map = L.map('map').setView([-33.665, 18.993], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

// navigator.geolocation.watchPosition(success, error);

// function success(pos) {
//     const lat = pos.coords.latitude;
//     const lng = pos.coords.longitude;
//     const accuracy = pos.coords.accuracy;
//     var marker=L.marker([lat,lng]).addTo(map);
//     L.circle([lat,lng], { radius: accuracy}).addTo(map);

// }
// function error(err) {
//     if(err.code == 1){
//         alert("Please allow geolocation access");
//     } else {
//         alert("Cannot get current location");
//     }
// }