import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import http from 'http';




import {
    Container, 
    Navbar,
    NavbarBrand, 
    Row, 
    Col, 
    Input
} from 'reactstrap';

import stayCard from "../src/stay.jsx";
import { throws } from 'assert';

class App extends Component {

   

    constructor(props){
        super(props);

        this.state = {
            dose: null,
            stayList: [],
            roomList: [],
            newDose: ''
        };
    }
    
    getStayList = () => {
        fetch('/stay')
        .then(res => res.json())
        .then(roomList => {
            this.setState({roomList});
        })
};    
 
   

    //Lifecycle Method, fetched Data und initialisiert Statevariable. 
    componentDidMount () {
       this.getStayList();
    }

    handleInputChange = (e) => {
        this.setState({newDose: e.value});
    };

    render() {
        return (
            <Container fluid className="centered">
                <Navbar color ="dark">
                    <NavbarBrand href = "/">Aufenthalte</NavbarBrand>
                </Navbar>
                <Row>
                    <Col>
                     <ul>
                         {this.state.roomList.map(stay =>
                            <li key = {stay.id}> {stay.id} {stay.dose}</li>
                            )}
                        </ul>
                    </Col>
                </Row>
            </Container>
        );

    }
}

export default App;