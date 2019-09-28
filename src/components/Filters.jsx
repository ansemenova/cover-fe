import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

class Filters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            operators: ["Теле2", "Мегафон", "МТС", "Билайн"]
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
                            value={this.props.from}
                            placeholder="Введите начальную точку маршрута"
                            onChange={this.props.onFromChange}
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
                            value={this.props.to}
                            placeholder="Введите конечную точку маршрута"
                            onChange={this.props.onToChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel>Выберите оператора связи</ControlLabel>
                    </Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" multiple value={this.props.selectedOperator}
                                     onChange={this.props.onOperatorChange}>
                            {this.mapObjectToOptions(this.state.operators)}
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={9}>
                        <Button bsStyle="success" onClick={this.props.onApply}>
                            Применить
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default Filters;