const axios = require("axios");

const getLocation = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFzaGFtamF2ZWQiLCJhIjoiY2thYmpmY2JyMTN1bjJzbDU5aDR1d28yeCJ9.1wvTbqadLF13u4oQYjeZ6g&limit=1`;

  try {
    const response = await axios.get(url);
    const [lng, lat] = response.data.features[0].center;
    return {
      lat,
      lng,
    };
  } catch (error) {
    throw new Error();
  }
};

module.exports = getLocation;
