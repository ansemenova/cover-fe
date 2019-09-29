import React, {Component} from 'react';
import TrainMap from "./TrainMap";
import Filters from "./Filters";
import {Col, Grid, Row} from "react-bootstrap";
import {BACKEND_URL, GEO_CODER_URL, GEO_CODER_URL_PART} from "../const/Constants";
import {authHeader} from "../util";

class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOperator: [],
            points:[],
            from:'',
            to:'',
            fromCoordinate:{},
            toCoordinate:{}
        }
    }

    onSelectedOperatorChange = (value) => {
        const options = value.target.options;
        const selectedValues = [];
        let currentOption;

        for (let i = 0; i < options.length; ++i) {
            currentOption = options[i];
            if (currentOption.selected) {
                selectedValues.push(currentOption.value);
            }
        }
        this.setState({
            selectedOperator: selectedValues
        });
    };

    onFromChange = (e) => {
        this.setState({from: e.target.value});
    };

    onToChange = (e) => {
        this.setState({to: e.target.value});
    };

    onApplyButton = () => {
        this.fillRouteCoordinate('from', 'fromCoordinate');
        this.fillRouteCoordinate('to', 'toCoordinate');

        fetch(BACKEND_URL + this.state.selectedOperator.join(','), {
            method: 'GET',
            headers: authHeader()
        }).then(response => response.json())
            .then((result)=>{
                let points = [];
                result.forEach(row => {
                    let point = [];
                    point[0] = row.lat;
                    point[1] = row.lng;
                    point[2] = parseInt(row.level) * 10;
                    points.push(point);
                });
                this.setState({
                    points: points
                });
            })
            .catch((err) => {
                window.console && console.log('ERROR', err);
            });
    };

    fillRouteCoordinate = (fieldName, coordinateName) =>  {
        let from = encodeURI(this.state[fieldName]);
        fetch(GEO_CODER_URL + from + GEO_CODER_URL_PART)
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    [coordinateName]: [result[0].lat, result[0].lon]
                });
            })
            .catch((err) => {
                window.console && console.log('ERROR', err);
            });
    };

    render() {
        return (<div className='mapStyle'>
            <div>
                <Grid>
                    <Row className="show-grid with-margin">
                        <Col xs={6}>
                            <h4>Укажите параметры фильтрации</h4>
                        </Col>
                    </Row>
                    <Filters onOperatorChange={this.onSelectedOperatorChange}
                             onApply={this.onApplyButton}
                             selectedOperator={this.state.selectedOperator}
                             onFromChange={this.onFromChange}
                             onToChange={this.onToChange}
                             from={this.state.from}
                             to={this.state.to}
                    />
                    <TrainMap selectedOperator={this.state.selectedOperator}
                              points={this.state.points}
                              fromCoordinate={this.state.fromCoordinate}
                              toCoordinate={this.state.toCoordinate}
                    />
                </Grid>
            </div>
        </div>);
    }
}

export default MapComponent;