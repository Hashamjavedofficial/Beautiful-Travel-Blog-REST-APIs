const axios = require("axios");

const getLocation = async (address) => {
  // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  //   address
  // )}.json?access_token=${process.env.MAPBOX_API}&limit=1`;

  // try {
  //   const response = await axios.get(url);
  //   const [lng, lat] = response.data.features[0].center;
  //   return {
  //     lat,
  //     lng,
  //   };
  // } catch (error) {
  //   throw new Error();
  // }
  return {
    lat: 40.7484405,
    lng: -73.9878584,
  };
};

module.exports = getLocation;
