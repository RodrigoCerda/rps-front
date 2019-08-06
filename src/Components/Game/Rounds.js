import React from 'react';
import {Table} from 'reactstrap';

/* Tabla de ganadores*/
export default class Rounds extends React.Component {
    render() {
        const {rounds} = this.props;
        return(
            <React.Fragment>
            {!!rounds &&  (
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Round</th>
                            <th>Winner</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!!rounds && (
                            rounds.map((winner, index) => {
                                return (
                                    <tr key={"winner-" + index}>
                                        <th>{index + 1}</th>
                                        <td>{winner}</td>
                                    </tr>
                                )
                            })
                        )}
                        </tbody>
                    </Table>
                )
            }
            </React.Fragment>
        )
    }
}
