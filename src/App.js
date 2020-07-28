




const drawHeatMap = data => {
  return
}

const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
fetch( api_url )
.then( res => res.json())
.then( data => {
  drawHeatMap(data)
})