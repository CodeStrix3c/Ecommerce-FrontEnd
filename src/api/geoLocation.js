import axios from 'axios';

const geocodeAddress = async (address) => {
  const res = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address,
        key: import.meta.env.VITE_GOOGLE_MAPS_KEY,
      },
    },
  );
  return res.data;
};

export default geocodeAddress;
