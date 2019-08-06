import React from 'react';
import {Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import Form from "reactstrap/es/Form";
import Select from 'react-select'
import GameApi from '../../GameApi';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        const {move, moves} = this.props;
        this.state = {
            move: move,
            moves: moves,
            defeats: moves.filter(m => (move.defeat.includes(m.value)))
        }
        this.handleSendData = this.handleSendData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDefeatValue = this.handleSelectDefeatValue.bind(this);
    }
    componentDidMount() {

    }

    /* Envía data a Api de editar movimiento */
    handleSendData(event) {
        event.preventDefault();
        const {move, defeats} = this.state;
        const {onEdit} = this.props;
        GameApi.editMove(move, defeats).then(() => {
            onEdit();
        })
        .catch(console.log)
    }
    /*Handle para los input de nombres*/
    handleInputChange(event) {
        const {move} = this.props;
        move.label = event.target.value;
        this.setState({
            move
        });
    }
    /* Handle para mantener lista de movimientos que vence el movimiento en edición */
    handleSelectDefeatValue(defeats) {
        this.setState({
            defeats
        });
    }
    render() {
        const {move, moves} = this.props;
        const {defeats} = this.state;
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
                                    defaultValue={defeats}
                                    isMulti
                                    name="defeats"
                                    options={moves.filter(k => (k.value !== move.value))}
                                    value={defeats}
                                    onChange={this.handleSelectDefeatValue}

                                />
                            </FormGroup>
                        </Col>
                        <Button>Submit</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}
