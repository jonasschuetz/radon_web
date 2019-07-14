import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';


class Employee extends Component {

    constructor(props){
        super(props);
        this.state = {
            'stays': [],
            emp: 0
        }
    }


    componentDidMount(){
        this.getList();
        this.getEmpList();
    }

    getEmpList = () => {
        var id = this.props.match.params.id;
        fetch(`/api/employee/${id}`)
        .then(res => res.json())
        .then(result => this.setState({emp: result }))
    }  

    getList = () => {
        var id = this.props.match.params.id;
        fetch(`/api/stay/employee/${id}`)
        .then(res => res.json())
        .then(results => this.setState({ 'stays': results }))
    }

    render() {
        return(
            <div className="App">
                <Navbar/>
                <Container className="radonContainer">
                <Row>   
                <Col>
                <h1>{this.state.emp.firstName} {this.state.emp.lastName}</h1>
                <p>ID: {this.props.match.params.id}</p>
                
                <ul>
                    {this.state.stays.map(function(stay, index) {
                        return(
                            <div key={index}>
                            <div className="FlacheRadonCard">
                                <p className="StayAnlagenamen">Aufenthalt {stay.id}</p>
                                <p className="RadonText">{stay.startTime}</p>
                                <p className="RadonText">{stay.endTime}</p>
                                <p className="RadonText">{stay.dose}</p>
                            </div>  
                            </div>
                           
                        ) 
                    }
                    )}
                </ul>
                <div>
                <Link to="/">
                    <button variant="raised">
                        Zurück
                    </button>
                </Link>
                </div>
                </Col>
                </Row>
                </Container>
            </div>
            
              
        
        );
    }
}

export default Employee;