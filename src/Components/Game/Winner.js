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
        const { winner} = this.props;
        return(
            <React.Fragment>
                <h1>We have a WINNER!!!</h1>
                <h3><strong>{winner}&nbsp;</strong> is the new EMPEROR</h3>
                <Button onClick={this.resetGame}>Play Again!</Button>
                <Link to="/"><Button>Back to Start!</Button></Link>
            </React.Fragment>
        )
    }
}
