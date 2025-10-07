export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const gpsString = `${lat}, ${lng}`;
        resolve({ gpsString, latitude: lat, longitude: lng });
      },
      () => {
        reject(new Error("Unable to fetch location. Try again outdoors."));
      }
    );
  });
};
