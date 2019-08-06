
import React from 'react';
import {Button, Col, Container, FormGroup, Input, Label, Row} from 'reactstrap';
import Form from "reactstrap/es/Form";
import GameApi from "../../GameApi";
import Header from "./Header";
import { Link } from "react-router-dom";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            gaming: false,
            moves: null,
            error: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkData = this.checkData.bind(this);
    }

    componentDidMount() {
        /* Movimientos disponibles */
        GameApi.getMoves().then((data) => {
            const moves = data.map(move => {
                return ({
                    label: move.label,
                    defeat: move.defeat,
                    value: move._id
                })
            });
            this.setState({ moves })
        })
        .catch(console.log)
    }
    /*Handle para los input de nombres*/
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    /*Se permite jugar solo si se ingresan nombres y se obtienen los movimientos desde el servicio*/
    checkData(event) {
        const {playerOneName, playerTwoName, moves} = this.state;
        if (!(!!playerOneName && !!playerTwoName && !!moves)){
            event.preventDefault();
            this.setState({
                error: true,
            });
        }
    }
    render() {
        const {playerOneName, playerTwoName, moves} = this.state;
        return (
            <React.Fragment>
                <Container>
                    <Header moves={moves}/>
                    <Form onSubmit={ (e) => this.handlePlayButton(e) }>
                        <Row>
                            <Col><h3>Enter the name of players and press Play!</h3></Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="playerOneName">Name First Player</Label>
                                    <Input name="playerOneName"
                                           value={playerOneName}
                                           onChange={this.handleInputChange}
                                           id="playerOneName"
                                           placeholder="Enter your name"/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="playerTwoName">Name Second Player</Label>
                                    <Input name="playerTwoName"
                                           value={playerTwoName}
                                           onChange={this.handleInputChange}
                                           id="playerTwoName"
                                           placeholder="Enter your name"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Link to={{
                            pathname: "/game",
                            state: {
                                playerOneName,
                                playerTwoName,
                                moves
                                }
                            }}
                            onClick={this.checkData}>
                            <Button color="primary" size="lg">PLAY!</Button>
                        </Link>
                    </Form>
                </Container>
        </React.Fragment>
        )
    }

}
