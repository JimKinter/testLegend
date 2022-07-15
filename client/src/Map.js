import React, { Component, useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import Legend from "./Legend";
import HeatmapLayer from "react-leaflet-heatmap-layer"

//This is just pure styling
function Header(){
  return(
  <header className = 'header-Class'>
    <p>Testing out React-Leaflet</p>
  </header>
  );
}

//This is the main component. It will make a fetch request to the backend, process
//the data received from the backend (remove the duds), before creating the map,
//and plotting the data on the map 
class MapLeaflet extends Component {
  state ={
    data: []
  }
  //fetch the data as soon as the component is mounted
  componentDidMount(){
    fetch("/data").then((response) => response.json())
    .then(jsonData => {
      this.setState({ data: jsonData });
    })
  }
  render() {
    var stateVar = {
      lat: 30.4515,
      lng: -91.1871,
      zoom: 10,
    }
    var totalArray = []
    for(let i = 0; i < this.state.data.length; i++){
      if(this.state.data[i]["lat"] != ""){
        var depthArray = [];
        depthArray.push(parseFloat(this.state.data[i]["lat"]));
        depthArray.push(parseFloat(this.state.data[i]["lon"]));
        depthArray.push(this.state.data[i]["depth"]);
        totalArray.push(depthArray);
      }
    }
    console.log(totalArray);
    const position = [stateVar.lat, stateVar.lng]
    
    return(
      //create the map and its tile layer, before graphing the data on the map
      <Map center={position} zoom={stateVar.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Legend />
      <HeatmapLayer fitBoundsOnLoad
            fitBoundsOnUpdate
            points={totalArray}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])}/>
    </Map>
    );
  }
}

export default MapLeaflet;
