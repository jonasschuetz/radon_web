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

var dbURL = 'http://86.119.40.8:8008/stays';

class App extends Component {

   

    constructor(props){
        super(props);

        this.state = {
            dose: null,
            stayList: [],
            newDose: ''
        };
    }
    
    getStayList = () => {
       fetch('controller/stayController')
       .then(response => {
           if(response.status === 200) return console.log('success');
           else return {error: 'there was an error with connecting with the server'}
    //    }).then(data => {
    //            this.setState({
    //                stayList: data,
    //            })
    //     })
    });
};    
 
        // fetch(stayURL)
        // .then(res => res.json())
        // .then(res =>  {
        //    this.setState({
        //       stayList: data,
        // })
        // });
   

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
                         {this.state.stayList.map(stay =>
                            <li key = {stay.id}> {stay.id} {stay.dose} {stay.startTime}></li>
                            )}
                        </ul>
                    </Col>
                </Row>
            </Container>
        );

    }
}

export default App;