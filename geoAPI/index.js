const GeoEncoder = require("./src/GeoEncoding");
const FileIO = require("./src/FileIO");
const fs = require("fs");

// const UNIQUE_FILE_NAME = __dirname + "/uniqueAddress.json";
// const ID_MAPPING = __dirname + "/idMapping.json";
// const LAT_LNG_FILE = __dirname + "/latLng.json";

// const result = [];

/**
 * IMP
 * */
// uncomment this to populate address & Ids from files.
// FileIO.getUniqueAddresses();
// FileIO.mapIdsDataWithLatLang();
// let rawUniqueAddr = fs.readFileSync(UNIQUE_FILE_NAME);
// let uniqueAddr = Object.keys(JSON.parse(rawUniqueAddr));


//
// for (let index = 0 ;index < 2050 ; index++) {
//   const element = uniqueAddr[index];
//   GeoEncoder
//   .getLatitudeLongitude(element)
//   .then(location => {
//     if(location && (location.lat || location.lng)) {
//       result.push({ address: element, lat: location.lat, lng:location.lng });
//     }
//
//     if(index % 200 === 0) {
//       fs.writeFile(LAT_LNG_FILE, JSON.stringify(result), "utf8");
//       console.log("******** Index last ********", index);
//     }
//
//     if(index > 2000) {
//       throw new Error("2000 limit reached");
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }

// console.log(result.length);

