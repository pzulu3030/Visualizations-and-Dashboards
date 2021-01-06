// Functions for events
function getDemoInfo(id_number) {
  // Search jason file for input names value
  // console.log(id);
  d3.json("samples.json").then((data) => {
    metadata = data.metadata;
    // console.log(metadata);
    result = metadata.filter((meta) => meta.id.toString() === id_number)[0];
    // console.log(result);
    // result1 = metadata.filter((meta) => meta.id.toString() === id_number);
    // console.log(result1);

    let demographicInfo = d3.select("#sample-metadata");
    demographicInfo.html("");
    // to display list of values for subject id
    Object.entries(result).forEach((key) => {
      demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
    });
  });
}
function optionChanged(id) {
  getDemoInfo(id);
  plotCharts(id);
}
function plotCharts(id_number) {
  d3.json("samples.json").then((data) => {
    //console.log(data);
    sampledata = data.samples;
    result = sampledata.filter((meta) => meta.id.toString() === id_number)[0];
    console.log(result);

    let sampleValues = result.sample_values.slice(0, 10).reverse();
    console.log(sampleValues);
    let labels = result.otu_labels.slice(0, 10);
    // console.log(labels);
    let top10_otu = result.otu_ids.slice(0, 10).reverse();
    // console.log(top10_otu);
    let otu_id = top10_otu.map((d) => "OTU " + d);
    // console.log(data.samples[0].otu_ids);
    let trace = {
      x: sampleValues,
      y: otu_id,
      text: labels,
      marker: {
        color: "blue",
      },
      type: "bar",
      orientation: "h",
    };

    data = [trace];
    let layout = {
      title: " Top 10 OTU",
      yaxis: {
        tickmode: "linear",
      },
      // margin: {
      //   l: 100,
      //   r: 100,
      //   t: 100,
      //   b: 30,
      // },
    };
    Plotly.newPlot("bar", data, layout);
    // Create bubble chart
    let trace1 = {
      x: top10_otu,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: top10_otu,
      },
      text: labels,
    };
    let layout2 = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000,
    };
    let data1 = [trace1];
    Plotly.newPlot("bubble", data1, layout2);
  });
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
    id = data.names[0];
    //display plot
    plotCharts(id);
  });
}

init();
