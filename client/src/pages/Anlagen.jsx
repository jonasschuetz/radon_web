import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

class Anlagen extends Component {
    render() {
        return(
            <div>
            <Navbar/>
            <Container className="radonContainer">
                <Col>
                <h1>Anlagen</h1>
                <div>
                <Link to="/">
                    <button variant="raised">
                        Zurück
                    </button>
                </Link>
                </div>
                </Col>
            </Container>
            </div>
        )
    }
}

export default Anlagen;