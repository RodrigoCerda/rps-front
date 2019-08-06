import React from 'react';
import {FormGroup, Label, Row, Col} from 'reactstrap';
import Select from 'react-select'

export default class MoveSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerSelection: null
        }
        this.handlePlayerSelection = this.handlePlayerSelection.bind(this);
    }
    /* Controla el cambio de opción y la envía al componente padre por función en props*/
    handlePlayerSelection(option) {
        const { onChange } = this.props;
        this.setState({
            playerSelection: option
        }, () => {
            onChange(option)
        });
    }
    render() {
        const { moves, playerName, textColorClass } = this.props;
        const {playerSelection} = this.state;
        return(
            <React.Fragment>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label> <strong className={textColorClass}>{playerName}&nbsp;</strong> Choose your option</Label>
                            <Select options={moves} value={playerSelection} onChange={this.handlePlayerSelection}/>
                        </FormGroup>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
