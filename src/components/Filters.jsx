import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

class Filters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            from: '',
            to: '',
            selectedOperator: {},
            operators: ["TELE2", "Megafon", "MTC", "Билайн"]
        };
    };

    mapObjectToOptions = (arr) => {
        return arr.map((obj, index) => {
            return (<option key={index} value={obj}>{obj}</option>)
        })
    };

    render() {
        return (

            <Form horizontal>
                <FormGroup>
                    <Col sm={2}>
                        <ControlLabel>Откуда</ControlLabel>
                    </Col>
                    <Col sm={7}>
                        <FormControl
                            type="text"
                            value={this.state.from}
                            placeholder="Введите начальную точку мрашрута"
                            onChange={(e) => this.setState({from: e})}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={2}>
                        <ControlLabel>Куда</ControlLabel>
                    </Col>
                    <Col sm={7}>
                        <FormControl
                            type="text"
                            value={this.state.to}
                            placeholder="Введите конечную точку маршрута"
                            onChange={(e) => this.setState({to: e})}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel>Выберите оператора связи</ControlLabel>
                    </Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" value={this.state.selectedOperator}
                                     onChange={(e) => this.setState({selectedOperator: e})}>
                            {this.mapObjectToOptions(this.state.operators)}
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={9}>
                        <Button bsStyle="primary">
                            Применить
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default Filters;