import React from 'react';
import {Row, Col} from 'reactstrap';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Row>
                <span style={{position: "absolute", right:10}}>Change Moves</span>
                <Col>
                    <h1>Rock Paper & Scissor</h1>
                    <h6>By Rodrigo Cerda R.</h6>
                </Col>
            </Row>
        )
    }
}
