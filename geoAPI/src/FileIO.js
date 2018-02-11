const fs    = require("fs");
const csv = require("fast-csv");

const FILE_NAME =  __dirname + "/../data_clean_reduced3.csv";
const UNIQUE_FILE_NAME = __dirname + "/../uniqueAddress.json";
const ID_MAPPING = __dirname + "/../idMapping.json";
const LAT_LNG_FILE = __dirname + "/../latLng.json";
const FINAL_FILE = __dirname + "/../data.json";

let highPriorityFields = [
  "City/Town/Hamlet",
  "County",
  "Country"
];

let lowPriorityFields = [
  "Island",
  "Bay/Harbor",
  "Sea/Gulf/Strait",
  "Island Group"
];

class FileIO {
  static getUniqueAddresses () {
    let stream = fs.createReadStream(FILE_NAME);
    let i = 0;
    let headersMap = { };
    let uniqueAddresses = { };
    let idAddressMapping = { };

    csv
      .fromStream(stream)
      .on("data", function(data){
        data = data.slice(1, data.length);
        if(i++ === 0) {
          data.forEach((el,index) => {
            headersMap[el] = index;
          });
        } else {
          let address = getAddress(data, headersMap);
          if (address) {
            const allFieldsObj = getAllFieldsObj(address, data, headersMap);
            idAddressMapping[data[0]] = allFieldsObj;
            uniqueAddresses[address] = true;
          }
        }
      })
      .on("end", function(){
        fs.writeFile(UNIQUE_FILE_NAME, JSON.stringify(uniqueAddresses), "utf8");
        fs.writeFile(ID_MAPPING, JSON.stringify(idAddressMapping), "utf8");
        // console.log("Unique Addresses", idAddressMapping);
        console.log("Unique Addresses Length", Object.keys(uniqueAddresses).length);
        console.log("Total Records", Object.keys(idAddressMapping).length);
      });
  }

  static mapIdsDataWithLatLang() {
    let idMapping = JSON.parse(fs.readFileSync(ID_MAPPING));
    let latLng = { };
    JSON.parse(fs.readFileSync(LAT_LNG_FILE)).forEach(el => {
      latLng[el["address"]] = { lat: el["lat"], lng: el["lng"]}
    });

    console.log(latLng);
    let uniqueAddress = JSON.parse(fs.readFileSync(UNIQUE_FILE_NAME));
    let result = [];

    let keys= Object.keys(idMapping);

    keys.forEach(el => {
      if(latLng[idMapping[el]["address"]]) {
        let val = idMapping[el];
        val.lat = latLng[idMapping[el]["address"]].lat;
        val.lng = latLng[idMapping[el]["address"]].lng;
        result.push(val);
        // console.log(result);
      }
    });

    fs.writeFile(FINAL_FILE, JSON.stringify(result), "utf8");
    console.log("****** final length ******", result.length);
  }
}

function getAddress(data, headersMap) {
  let address = [];

  highPriorityFields.forEach(el => {
    let field = data[headersMap[el]];
    if (field) {
      address.push(field);
    }
  });

  if (address.length === 0) {
    lowPriorityFields.forEach(el => {
      let field = data[headersMap[el]];
      if (field && address.length === 0) {
        address.push(field);
      }
    });
  }

  if(address.length > 0) {
    return address = address.join(",");
  }

  return null;
}


function getAllFieldsObj(address, data, headersMap) {
  let result = { };
  Object.keys(headersMap).forEach(el => {
      if(data[headersMap[el]]) {
        result[el] = data[headersMap[el]];
      }
  });

  result.address = address;
  return result;
}

module.exports = FileIO;
