// This is the list of default alts that we have on the chart
var defaultAlts = ["BTC", "ETH", "ADA", "BNB", "XRP", "UNI", "DOT", "DOGE", "LINK"];


// This is the code to add the defaultAlts and submittedAlts together to form the totalList, which is what is showing on the chart.

var addedAlt = [];

var totalList = addedAlt.concat(defaultAlts);

function newData() {
    var newAlt = document.getElementById("submitbox").value;

    var addedAlt = [newAlt];

    var totalList = defaultAlts.concat(addedAlt);

    // Add the total list to the console to see which coins are added
    // console.log(totalList);

    $( "#mychart" ).empty();// empty div to be safe
    CryptoCharts.roiComparison({
        chart_id: "mychart",
        cryptocompare_tickers: totalList,
        last_days: timeframe,
        options: {
            colors: ["#FF5733","#56636B","#1A8AD4","#F1C408","#0584FE","#F1079C","#F12208","#DBC904","#099EED","#010609"],
            title: true,
            chart: {
                type: 'line'
            }
        }
    });

}


// This is where I am creating the timeframe button so the user can change the timeframe of the tool

var timeframe = [90];

function changeTimeframe()
{
    var newTimeframe = document.getElementsByClassName("timeframe")[0].value;
    var timeframeInteger = parseInt(newTimeframe);
    timeframe.splice(0, 1, timeframeInteger);

    console.log(timeframe);

    $( "#mychart" ).empty();// empty div to be safe
    CryptoCharts.roiComparison({
        chart_id: "mychart",
        cryptocompare_tickers: totalList,
        last_days: timeframe,
        options: {
            colors: ["#FF5733","#56636B","#1A8AD4","#F1C408","#0584FE","#F1079C","#F12208","#DBC904","#099EED","#010609"],
            title: true,
            chart: {
                type: 'line'
            }
        }
    });
};

// This is the code to retreive the data, as well as the charting library for the relative strnegth/weakness chart. You can find more detail here: icnhodler.github.io/CryptoCharts/#/roi-charts/demos
//person.firstName

CryptoCharts.roiComparison({
    chart_id: "mychart",
    cryptocompare_tickers: totalList,
    last_days: timeframe,
    options: {
      colors: ["#FF5733","#56636B","#1A8AD4","#F1C408","#0584FE","#F1079C","#F12208","#DBC904","#099EED","#010609"],
      title: true,
      chart: {
        type: 'line'
      }
    }
});
