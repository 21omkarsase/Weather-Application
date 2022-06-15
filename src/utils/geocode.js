const request = require("request");

const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=[YOUR_API_KEY]&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service", undefined);
    } else if (body.error || body.data.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      const { latitude, longitude, name, region, country } = body.data[0];
      callback(undefined, {
        latitude,
        longitude,
        name,
        region,
        country,
      });
    }
  });
};

module.exports = geoCode;
