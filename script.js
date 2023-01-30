const mapBox = `pk.eyJ1Ijoia2FuZGVsa2FwaWwiLCJhIjoiY2t4cG80MGxzMDAzbzJ2c2J5a2Z1NHg2aSJ9.GU9WtDpJ9dDGn1JNySDO2A`;
mapboxgl.accessToken = mapBox;
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  });

 const items= [

]

let x = document.getElementById("demo");
const ipKey = `at_ShqNiVwugm2BYBaAAxhAjywkoOrAV`;
// &ipAddress=8.8.8.8
const api = `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}`;

const getUserInfo = async () => {
 const response = await fetch(api)
 	.then((res)=>res.json())
	.then((rsp)=>console.log(rsp,'response'))
		// waits until the request completes...
}

getUserInfo();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
	y = navigator.geolocation.getCurrentPosition;
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();


function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}