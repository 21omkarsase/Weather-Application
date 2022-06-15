const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=[YOUR_API_KEY]&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (err, data) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (data.body.error) {
      if (data.body.error.code === "105") {
        callback("Unable to find location", undefined);
      } else {
        callback(
          "Monthly API call limit exceeded. We apologize for the inconvenience. Please try again later. You can let us know at saseomkar214@gmail.com",
          undefined
        );
      }
    } else {
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
