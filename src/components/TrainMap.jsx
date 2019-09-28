import Leaflet from 'leaflet';
import {GeoJSON, Map, Marker, Popup, TileLayer, Polygon, Polyline} from 'react-leaflet';
import React, {Component} from 'react';
import {mapConfig} from '../util';
import {renderToStaticMarkup} from 'react-dom/server';
import '../ReactLeafletMap.styl';

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/';

const data = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            id: "01",
            properties: { name: "Alabama", density: 94.65 },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-87.359296, 35.00118],
                        [-85.606675, 34.984749],
                        [-85.431413, 34.124869],
                        [-85.184951, 32.859696],
                        [-85.069935, 32.580372],
                        [-84.960397, 32.421541],
                        [-85.004212, 32.322956],
                        [-84.889196, 32.262709],
                        [-85.058981, 32.13674],
                        [-85.053504, 32.01077],
                        [-85.141136, 31.840985],
                        [-85.042551, 31.539753],
                        [-85.113751, 31.27686],
                        [-85.004212, 31.003013],
                        [-85.497137, 30.997536],
                        [-87.600282, 30.997536],
                        [-87.633143, 30.86609],
                        [-87.408589, 30.674397],
                        [-87.446927, 30.510088],
                        [-87.37025, 30.427934],
                        [-87.518128, 30.280057],
                        [-87.655051, 30.247195],
                        [-87.90699, 30.411504],
                        [-87.934375, 30.657966],
                        [-88.011052, 30.685351],
                        [-88.10416, 30.499135],
                        [-88.137022, 30.318396],
                        [-88.394438, 30.367688],
                        [-88.471115, 31.895754],
                        [-88.241084, 33.796253],
                        [-88.098683, 34.891641],
                        [-88.202745, 34.995703],
                        [-87.359296, 35.00118]
                    ]
                ]
            }
        }
    ]
};

class TrainMap extends Component {
    constructor() {
        super();
        this.state = {
            lat: 56.32688,
            lng: 44.005986,
            zoom: 13,
            markers: []
        }
    };

    getStyle(){
        return {
            weight: 2,
            opacity: 1,
            color: 'blue',
            dashArray: '3',
            fillOpacity: 0.7
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/allRoutes", {
            method: 'GET',
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => response.json())
            .then((result)=>{
                this.setState({markers: result});
                console.log('RESULT', result)
            })
            .catch((err) => {

                window.console && console.log('ERROR', err);
        });
    }

    render() {
        let routes = this.state.markers;
        //let LeafletMarkers = [];
        const staticPositions = [[56.2995677,43.8757591],
            [56.3738682,43.836145]];
        /*Object.keys(routes).forEach(function(key) {
            let markerColor = "#" + Math.random().toString(16).slice(2,8);
            let temp = routes[key].map((marker, index) => {
                let divStyle = {
                    color: markerColor
                };
                const iconMarkup = renderToStaticMarkup(<i className=" fas fa-map-marker-alt fa-3x" style={divStyle}/>);
                const customMarkerIcon = Leaflet.divIcon({
                    html: iconMarkup,
                });
                return (
                    <Marker position={marker.latlng} key={`marker_${key}_${index}`} icon={customMarkerIcon}>
                        <Popup>
                            <span>{index}</span>
                        </Popup>
                    </Marker>
                );
            });
            LeafletMarkers.push(...temp);*/
        const LeafletMarkers1212 = [];
        Object.keys(routes).map(function(key) {
            let markerColor = "#" + Math.random().toString(16).slice(2,8);
            const staticPositions = [[56.2995677,43.8757591],
                [56.3738682,43.836145]];
            let temp1 = [];
            let size = routes[key].length;
            let temp2222 = routes[key].map((marker,index) => {
                //temp1.push(marker.latlng);
                let temp1 = [];
                if(index < 3) {
                    temp1.push(marker.latlng);
                    temp1.push(routes[key][index+1].latlng);
                    return (<Polyline positions={temp1} color={markerColor} ></Polyline>);
                }
                return null;
            });
            LeafletMarkers1212.push(...temp2222);
        });

        let LeafletMarkers2 = [];
        Object.keys(routes).forEach(function(key) {
            let markerColor = "#" + Math.random().toString(16).slice(2, 8);
            let temp = routes[key].map((marker, index) => {
                let divStyle = {
                    color: markerColor
                };
                const iconMarkup = renderToStaticMarkup(<i className=" fas fa-map-marker-alt fa-3x" style={divStyle}/>);
                const customMarkerIcon = Leaflet.divIcon({
                    html: iconMarkup,
                });
                return (
                    <Marker position={marker.latlng} key={`marker_${key}_${index}`} icon={customMarkerIcon}>
                        <Popup>
                            <span>{index}</span>
                        </Popup>
                    </Marker>
                );
            });
            LeafletMarkers2.push(...temp);
        });

        return (
            <Map center={mapConfig.center} zoom={mapConfig.zoom} className="map__reactleaflet">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    minZoom = {2} maxZoom = {19} tileSize = {256}
                />
                <TileLayer
                    attribution='<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a> and OpenStreetMap'
                    url='http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'
                    minZoom = {2} maxZoom = {19} tileSize = {256}
                />
                {/*{LeafletMarkers1212}
                {LeafletMarkers2}*/}
                {/*<Polyline key={1} positions={[
                    [56.2995677,43.8757591],
                    [56.3738682,43.836145],
                    [56.2717866,44.0875016],
                    [56.3153834,44.0699247],
                    [56.2907236,44.052662]
                ]} color={'red'} />*/}
                {/*<Path dashArray={staticPositions} color="blue" ></Path>*/}
                {/* You can now try to find Alabama on a Map to see how it looks like now with GeoJSON*/}
                <GeoJSON data={data} style={this.getStyle} />
            </Map>
        );
    }
}

export default TrainMap;