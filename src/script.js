const ipKey = config.ip_key;
const mapBoxToken = config.mapBox_token;

const inputField = document.getElementById('ip-input');
const Ip = document.getElementById('ip');
const Location = document.getElementById('location');
const Timezone = document.getElementById('timezone');
const Isp = document.getElementById('isp');
const Search = document.getElementById('search-btn');

mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [84.1240, 28.3949],
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
getUserInfo('');


const getInputValue = () => {
  const ipValue = inputField.value;
  getUserInfo(ipValue);

}

Search.addEventListener('click', getInputValue);
Search.removeEventListener("click", Search);