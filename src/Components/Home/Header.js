import React from 'react';
import {Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    render() {
        const {moves} = this.props;
        return(
            <Row>
                {!!moves && (
                    <React.Fragment>
                    <span style={{position: "absolute", right:10}}>
                    <Link to={{
                        pathname: "/moves",
                        state: {
                            moves
                        }
                    }}>Change Moves</Link>
                    </span>
                        <Col>
                            <h1>Rock Paper & Scissor</h1>
                            <h6>By Rodrigo Cerda R. (rodrigo.cerda.r@usach.cl / +56989238480)</h6>
                        </Col>
                    </React.Fragment>
                )}
            </Row>
        )
    }
}
