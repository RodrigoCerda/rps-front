import React from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";

export default class Winner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerSelection: null
        }
        this.resetGame = this.resetGame.bind(this);
    }
    /*Ejecuta el ResetGame del controlador padre*/
    resetGame() {
        const {onResetGame} = this.props;
        onResetGame();
    }

    render() {
        return(
            <React.Fragment>
                <h1>Seems to be an Error!!1!</h1>
                <Link to="/"><Button>Back to Start!</Button></Link>
            </React.Fragment>
        )
    }
}
