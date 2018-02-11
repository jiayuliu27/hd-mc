const API_KEY = "AIzaSyC1KXUAVHh86a0Kaxjqi6j1rb8sr22Kb0Q";

const googleMapsClient = require('@google/maps').createClient({
  key: API_KEY,
  Promise: Promise,
  rate: {
    limit: 5,
    period: 2000
  }
});

class GeoEncoding {
  static getLatitudeLongitude(address) {
    return googleMapsClient
            .geocode({ address }).asPromise()
            .then((response) => {
              return this._filterResponse(address, response) || { };
            })
            .catch((error) => {
              console.log("Error in API call", error);
            });
  }

  static _filterResponse(address, response) {
    try {
      return response.json.results[0].geometry.location;
    } catch(error) {
      console.log("Error response address: " + address + "Error : " +  error);
      return { };
    }
  }
}

module.exports = GeoEncoding;
