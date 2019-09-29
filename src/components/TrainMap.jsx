import Leaflet from 'leaflet';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import React, {Component} from 'react';
import {getColor, mapConfig} from '../util';
import {renderToStaticMarkup} from 'react-dom/server';
import '../ReactLeafletMap.styl';
import HeatmapLayer from "react-leaflet-heatmap-layer/lib/HeatmapLayer";

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/';

class TrainMap extends Component {

    render() {
        let LeafletMarker = [];
        if(this.props.fromCoordinate && this.props.fromCoordinate.length
            && this.props.toCoordinate && this.props.toCoordinate.length) {
            LeafletMarker.push(this.renderMarker([this.props.fromCoordinate,this.props.toCoordinate]));
        }

        return (
            <Map center={mapConfig.center} zoom={mapConfig.zoom} className="map__reactleaflet">
                <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    points={this.props.points}
                    longitudeExtractor={point => point[1]}
                    latitudeExtractor={point => point[0]}
                    intensityExtractor={point => point[2]} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                < TileLayer
                    attribution='<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a> and OpenStreetMap'
                    url='http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'
                />
                {LeafletMarker}
            </Map>
        );
    }

    renderMarker(coordinate) {
        return coordinate.map((marker, index) => {
                let divStyle = {
                    color: getColor()
                };
                const iconMarkup = renderToStaticMarkup(<i className=" fas fa-map-marker-alt fa-5x" style={divStyle}/>);
                const customMarkerIcon = Leaflet.divIcon({
                    html: iconMarkup,
                });
                return (
                    <Marker position={marker} key={`marker_${index}`} icon={customMarkerIcon}>
                        <Popup>
                            <span>{index}</span>
                        </Popup>
                    </Marker>
                );
            });
    }
}

export default TrainMap;