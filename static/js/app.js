// Functions for events
function getDemoInfo(names) {}
//Initialize the display page
function init() {
  let dropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    data.names.forEach(function (name) {
      dropdown.append("option").text(name).property("value");
    });
  });
  // display the data and the plots on the page
  // display demographic data
  getDemoInfo(data.names[0]);
  //display plot
}

init();
