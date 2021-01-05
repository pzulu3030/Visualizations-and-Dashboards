// Functions for events
function getDemoInfo(id) {
  // Search jason file for input names value
  console.log(id);
  d3.json("samples.json").then((data) => {
    metadata = data.metadata;
    result = metadata.filter((meta) => meta.id.toString() === id)[0];
    console.log(result);

    let demographicInfo = d3.select("#sample-metadata");
    demographicInfo.html("");

    Object.entries(result).forEach((key) => {
      demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
    });
  });
}
function optionChanged(id) {
  getDemoInfo(id);
}
//Initialize the display page
function init() {
  let dropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    data.names.forEach(function (name) {
      dropdown.append("option").text(name).property("value");
    });
    // display the data and the plots on the page
    // display demographic data
    getDemoInfo(data.names[0]);
    //display plot
  });
}

init();
