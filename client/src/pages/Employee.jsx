import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';


class Employee extends Component {

    constructor(props){
        super(props);
        this.state = {
            stays: [],
            rooms: [],
            emp: 0,
            durations: {}            
        }
    }


    componentDidMount(){
        this.getStays();
        this.getEmp();
        this.getRoom();
    }

    getEmp = () => {
        var id = this.props.match.params.id;
        fetch(`/api/employee/${id}`)
        .then(res => res.json())
        .then(result => this.setState({emp: result }))
    }  

    getRoom = () => {
        fetch('/api/room')
        .then(res => res.json())
        .then(result => this.setState({rooms: result }))
    }

    getStays = () => {
        var id = this.props.match.params.id;
        fetch(`/api/stay/employee/${id}`)
        .then(res => res.json())
        .then(results => this.calulateDuration(results))
    }

    calulateDuration = (stays) => {
       var workingStays = stays;
       var durationsMap = {};
       for(var s in workingStays){
            var startDate = new Date(workingStays[s].startTime);
            var endDate = new Date(workingStays[s].endTime);
            var duration = startDate.getSeconds() - endDate.getSeconds();
            durationsMap[workingStays[s].id] = duration;
       }
       this.setState({stays: stays});
       this.setState({durations: durationsMap});

    }

    render() {
        var rooms = this.state.rooms;
        var durations = this.state.durations;
        console.log();
        return(
            <div className="App">
                <Navbar/>
                <Container className="radonContainer">
                <Row>   
                <Col>
                <div className="spacer" />
                <h1>{this.state.emp.firstName} {this.state.emp.lastName}</h1>
                <p>ID: {this.props.match.params.id}</p>
                <div className="spacer" />
                <div>
                    <p className="RadonText">Stunden:</p>

                </div>
                <div className="spacer" />
                <ul>
                    <li>
                    {this.state.stays.map(function(stay, index) {
                        return(
                            <div key={index}>
                            <div className="FlacheRadonCard">
                                <div className = "FlacheRadonCard-Links">
                                
                                <p className="StayAnlagenamen">Aufenthalt {stay.id}</p>
                                <p className="stayText">Raum: {stay.roomId}</p>  
                                <p className="stayText">Aufenthaltsdauer: {durations[stay.id]}</p>
                                
                                
                                </div>

                                <div className="FlacheRadonCard-Rechts">
                                <p className="dosisText">{stay.dose}</p>
                                <p className="dosisLabel">Bq / m3</p>                                
                                </div>
                            </div>  
                            </div>
                           
                        ) 
                    }
                    )}
                    </li>
                    
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