const ipKey = `at_ShqNiVwugm2BYBaAAxhAjywkoOrAV`;
const mapBox = `pk.eyJ1Ijoia2FuZGVsa2FwaWwiLCJhIjoiY2t4cG80MGxzMDAzbzJ2c2J5a2Z1NHg2aSJ9.GU9WtDpJ9dDGn1JNySDO2A`;
let longitude= -77.032;
let latitude= 38.913;
const inputField = document.getElementById('ip-input');
const Ip = document.getElementById('ip');
const Location = document.getElementById('location');
const Timezone = document.getElementById('timezone');
const Isp = document.getElementById('isp');
const Errors = document.getElementById('error-message');

mapboxgl.accessToken = mapBox;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 15,
    controls:true,
  });

  map.addControl(new mapboxgl.NavigationControl(),'bottom-right');

const el = document.createElement('img');
el.style.width = '30px';
el.src = "./assets/icon-location.svg";
el.style.backgroundSize='cover';
  let marker = new mapboxgl.Marker(el)
  .setLngLat([-77.032, 38.913])
  .addTo(map);

  const getRequiredData = (response) => {
   const {ip,location,isp} = response;
   const{lat,lng,country,region,city,timezone} = location;
  const coordinates = [parseFloat(lng),parseFloat(lat)]
    map.setCenter(coordinates)
    marker.setLngLat(coordinates)
   Ip.innerHTML = ip;
   Location.innerHTML = `${region}, ${city}, ${country}`
   Timezone.innerHTML = `UTC ${timezone}`
   Isp.innerHTML = isp
  }

  const clearInput =()=>{
    if (inputField.value !="") {
      inputField.value = "";
      }
  }

  const getUserInfo = async (ipAddr) => {
const api = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}&ipAddress=${ipAddr}`;
const response = await fetch(api)
     .then((res)=>res.json())
    .then((rsp)=> getRequiredData(rsp))
    .catch((e)=>{console.log(e)})
  }
  clearInput()


const getInputValue = () => {
  const ipValue = inputField.value;
  getUserInfo(ipValue);

}
getUserInfo('');
