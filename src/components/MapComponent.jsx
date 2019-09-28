import React, {Component} from 'react';
import TrainMap from "./TrainMap";
import Filters from "./Filters";
import {Col, Grid, Row} from "react-bootstrap";

class MapComponent extends Component {
    render() {
        return (<div className='mapStyle'>
            <div>
                <Grid>
                    <Row className="show-grid with-margin">
                        <Col xs={6}>
                            <h4>Укажите параметры фильтрации</h4>
                        </Col>
                    </Row>
                    <Filters/>
                    <TrainMap/>
                </Grid>
            </div>
        </div>);
    }
}

export default MapComponent;