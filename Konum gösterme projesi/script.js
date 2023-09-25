let locationButton = document.getElementById("location");
let locationDiv = document.getElementById("location-details");
locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    locationDiv.innerText = "Tarayıcı coğrafi konumu desteklemiyor";
  }
});
const checkError = (error) => {
  switch (error.code) { 
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Lütfen konum erişime izin verin";
      break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.innerText = "Konum Bilgisi mevcut değil";
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "Kullanıcı konumun alma isteği zaman aşımına uğradı";
  }
};
const showLocation = async (position) => {
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  let data = await response.json();
  locationDiv.innerText = `${data.address.town} / ${data.address.province}, ${data.address.country}`;
};