import React from 'react';
import {
    Row,
    Col,
    Table
} from 'reactstrap';

const stayCard = (props) => {
    const { data } = props;

    if (!data)
        return <div> </div>

    return(
        <Row className = "Aufenthaltscard">
            <Col sm = "12" md = {{size: 4, offset: 4}}>
                <h2></h2>
                <span>
                </span>
                <table>
                    <tbody>
                    </tbody>
                </table>
            </Col>
        </Row>
    );

};
export default stayCard; 