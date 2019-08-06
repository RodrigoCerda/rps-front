import React from 'react';
import {Row, Col, Table, Button} from 'reactstrap';
import Edit from "./Edit";
import GameApi from "../../GameApi";
import Create from "./Create";
import {Link} from "react-router-dom";
import Container from "reactstrap/es/Container";

export default class Moves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: null,
            isEditing: false,
            moveEditing: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    componentDidMount() {
        const {location} = this.props;
        if (!!location && !!location.state){
            const {moves} = location.state;
            this.setState({
                moves
            });
        } else {
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
    }
    handleChange(index) {
        this.setState({
            isEditing: false
        }, () => {
            const {moves} = this.state;
            this.setState({
                moveEditing: moves[index],
                isEditing: true
            })
        })
    }
    handleDelete(index) {
        const {moves} = this.state;
        const id = moves[index].value;
        GameApi.deleteMove(id).then(() => {
            this.handleEdit();
        }).catch(console.log)
    }
    handleEdit() {
        this.setState({
            isEditing: false,
            isCreating: false
        }, () => {
            GameApi.getMoves().then((data) => {
                const moves = data.map(move => {
                    return ({
                        label: move.label,
                        defeat: move.defeat,
                        value: move._id
                    })
                });
                this.setState({ moves })
            }).catch(console.log)
        })
    }
    handleCreate() {
        this.setState({
            isCreating: true
        }, () => {
            GameApi.getMoves().then((data) => {
                const moves = data.map(move => {
                    return ({
                        label: move.label,
                        defeat: move.defeat,
                        value: move._id
                    })
                });
                this.setState({ moves })
            }).catch(console.log)
        })
    }
    render() {
        const {moves, moveEditing, isEditing, isCreating} = this.state;
        return(
            <Container fluid={true}>
                <Row>
                    <Col>
                    <span style={{position: "absolute", right:10}}>
                            <Link to="/">Home</Link>
                    </span>
                        <h1>Rock Paper & Scissor</h1>
                        <h6>By Rodrigo Cerda R.</h6>
                        <h3>Change moves!</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={"6"}>
                        <Button onClick={this.handleCreate}>Create Move</Button>
                        {!!isEditing && (
                            <Edit moves={moves} move={moveEditing} onEdit={() => this.handleEdit()}/>
                        )}
                        {!!isCreating && (
                            <Create moves={moves} onCreate={() => this.handleEdit()}/>
                        )}
                    </Col>
                    <Col xs={"6"}>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>N°</th>
                                <th>Move</th>
                                <th>Defeats</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!!moves && (
                                moves.map( (move, index) => (
                                        <tr key={"move-" + index}>
                                            <th>{index + 1}</th>
                                            <td>{move.label}</td>
                                            <td>
                                                {move.defeat.map(d => (1 && moves.find(m => m.value === d).label + " "))}
                                            </td>
                                            <td>
                                                <Button onClick={() => this.handleChange(index)}>Change</Button>
                                                <Button onClick={() => this.handleDelete(index)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ), this)
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}
