import React from 'react';
import {Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import Form from "reactstrap/es/Form";
import Select from 'react-select'
import GameApi from '../../GameApi';


export default class Create extends React.Component {
    constructor(props) {
        super(props);
        const {moves} = this.props;
        const move = {
            label: '',
            defeat: [],
            value: null
        }
        this.state = {
            move: move,
            moves: moves,
            defeats: moves.filter(m => (move.defeat.includes(m.value)))
        }
        this.handleSendData = this.handleSendData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDefeatValue = this.handleSelectDefeatValue.bind(this);
    }
    /* Envía la data a Api de crear movimiento */
    handleSendData(event) {
        event.preventDefault();
        const {move, defeats} = this.state;
        const {onCreate} = this.props;
        GameApi.createMove(move, defeats).then(() => {
            onCreate();
        }).catch(console.log)
    }
    /*Handle para los input de nombres*/
    handleInputChange(event) {
        const {move} = this.state;
        move.label = event.target.value;
        this.setState({
            move
        });
    }
    /* Handle para mantener lista de movimientos que vence el movimiento en creación */
    handleSelectDefeatValue(defeats) {
        this.setState({
            defeats
        });
    }
    render() {
        const {moves} = this.props;
        const {move, defeats} = this.state;
        return(
            <Row>
                <Col>
                    <Form onSubmit={ (e) => this.handleSendData(e) }>
                        <Col>
                            <FormGroup>
                                <Label for="moveName">Move Name:</Label>
                                <Input name="moveName"
                                       value={move.label}
                                       onChange={this.handleInputChange}
                                       id="moveName"
                                       placeholder="Name"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="playerTwoName">Defeat:</Label>
                                <Select
                                    isMulti
                                    name="defeats"
                                    options={moves}
                                    value={defeats}
                                    onChange={this.handleSelectDefeatValue}

                                />
                            </FormGroup>
                        </Col>
                        <Button>Save</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}
