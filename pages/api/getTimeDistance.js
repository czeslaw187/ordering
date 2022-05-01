var openrouteservice = require("openrouteservice-js");

export default async function getTimeDistance(req, res) {
    // Add your api_key here
var Matrix = new openrouteservice.Matrix({ api_key: "5b3ce3597851110001cf6248732d5c106af1474ca1c49813768fe90d"});

Matrix.calculate({
  locations: [[8.690958, 49.404662], [8.687868, 49.390139], [8.687868, 49.390133]],
  profile: "driving-car",
  sources: ['all'],
  destinations: ['all']
})
.then(function(response) {
  // Add your own result handling here
  console.log("response", response);
})
.catch(function(err) {
  var str = "An error occurred: " + err;
  console.log(str);
});
}