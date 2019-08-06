import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import Rounds from "./Rounds";
import MoveSelector from "./MoveSelector";
import Winner from "./Winner";
import GameApi from "../../GameApi";
import Error from "./Error";


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            round: 1,
            playerOneScore: 0,
            playerTwoScore: 0,
            playerOneSelection: null,
            playerTwoSelection: null,
            gaming: false,
            okGameData: false,
            score: [],
            winner: ''
        }
        this.handlePlayerOneSelection = this.handlePlayerOneSelection.bind(this);
        this.handlePlayerTwoSelection = this.handlePlayerTwoSelection.bind(this);
        this.getTheWinner = this.getTheWinner.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    componentDidMount() {
        const {location} = this.props;
        /* Data desde Home*/
        if (!!location && !!location.state){
            const {playerOneName, playerTwoName, moves} = location.state;
            this.setState({
               okGameData: true,
               playerOneName,
               playerTwoName,
               moves
            });
        }
    }

    /* manejador de la selección de movimiento del jugador 1*/
    handlePlayerOneSelection(playerOneSelection) {
        this.setState({playerOneSelection})
    }
    /* manejador de la selección de movimiento del jugador 2*/
    handlePlayerTwoSelection(playerTwoSelection) {
        this.setState({playerTwoSelection}, () => this.getTheWinner())
    }
    /* Cada movimiento disponible tiene un arreglo de movimientos a los cuales vence (defeat). Para definir
    *  que jugador gana el round se busca la selección de un jugador en el arreglo defeat de
    *  la selección del otro jugador. En caso de que un jugador logre 3 triunfos
    *  Se declara ganador y se almacena su nombre en el sistema
    * */
    getTheWinner() {
        const {playerOneName,
            playerTwoName,
            playerOneSelection,
            playerTwoSelection,
            playerOneScore,
            playerTwoScore,
            score} = this.state;

        /* Condición de victoria jugador 1*/
        if (!!playerOneSelection && !!playerTwoSelection && playerOneSelection.defeat.includes(playerTwoSelection.value)){
            this.setState({
                score: score.concat(playerOneName),
                playerOneScore: playerOneScore + 1,
                playerOneSelection: null,
                playerTwoSelection: null,
                gaming: playerOneScore + 1 === 3? false: true,
                winner: playerOneScore + 1 === 3? playerOneName: ''
            }, () => this.sendWinner());
            return
        }
        /* Condición de victoria jugador 2*/
        if (!!playerOneSelection && !!playerTwoSelection && playerTwoSelection.defeat.includes(playerOneSelection.value)){
            this.setState({
                score: score.concat(playerTwoName),
                playerTwoScore: playerTwoScore + 1,
                playerOneSelection: null,
                playerTwoSelection: null,
                gaming: playerTwoScore + 1 === 3? false: true,
                winner: playerTwoScore + 1 === 3? playerTwoName: ''
            }, () => this.sendWinner())
            return
        }
        /* Condición de empate*/
        this.setState({
            score: score.concat('Draw'),
            playerOneSelection: null,
            playerTwoSelection: null,
        });

    }

    /*Se reinicia el estado del componente para volver a jugar*/
    resetGame() {
     this.setState({
         moves: this.state.moves,
         round: 1,
         playerOneScore: 0,
         playerTwoScore: 0,
         playerOneSelection: null,
         playerTwoSelection: null,
         gaming: true,
         score: [],
         winner: ''
     })
    }
    /*Se envía el nombre del ganador al sistema*/
    sendWinner() {
        const {winner} = this.state;
        if (!!winner) {
            GameApi.sendWinner(winner).then(data => (console.log(data)))
        }
    }
    render(){
        const {okGameData,
            playerOneSelection,
            playerTwoSelection,
            score,
            winner,
            playerOneName,
            playerTwoName,
            moves} = this.state;
        return(
            <React.Fragment>
                {!!okGameData ?
                    (<Container>
                        {!winner && (
                            <React.Fragment>
                                <h3>{playerOneName} <strong>Vs</strong> {playerTwoName}</h3>
                                <h2>Round <strong>{score.length + 1}</strong></h2>
                                <Row>
                                    <Col>
                                        {!playerOneSelection && (
                                            <MoveSelector playerName={playerOneName}
                                                          textColorClass="text-primary"
                                                          moves={moves}
                                                          onChange={this.handlePlayerOneSelection}/>
                                        )}
                                        {!!playerOneSelection && !playerTwoSelection && (
                                            <h3>Good Choice <strong className="text-primary">{playerOneName}&nbsp;</strong>
                                                , now turn around and let {playerTwoName} make his(her) choice</h3>
                                        )}
                                        {!!playerOneSelection && !playerTwoSelection && (
                                            <MoveSelector playerName={playerTwoName}
                                                          textColorClass="text-danger"
                                                          moves={moves}
                                                          onChange={this.handlePlayerTwoSelection}/>
                                        )}
                                        {!playerOneSelection && (
                                            <h3>
                                                Hey <strong className="text-danger">{playerTwoName}&nbsp;</strong>, turn around
                                                and let <strong className="text-primary">{playerOneName}&nbsp;</strong>
                                                make his move
                                            </h3>
                                        )}
                                    </Col>
                                    <Col>
                                        <Rounds rounds={score}/>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )}
                        {!!winner && (
                            <Winner winner={winner} onResetGame={this.resetGame}/>
                        )}
                    </Container>
                )
                :<Error/>
                }
            </React.Fragment>
        )
    }
}
