import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


class Employee extends Component {

    constructor(props){
        super(props);
        this.state = {
            'stays': []
        }
    }


    componentDidMount(){
        this.getList();
    }

    getList = () => {
        fetch('/api/stay')
        .then(res => res.json())
        .then(results => this.setState({ 'stays': results }))
    }

    render() {
    
        return(
            <div className="App">
                <Navbar/>
                <ul>
                    {this.state.stays.map(function(stay, index) {
                        return(
                            <div className="FlacheRadonCard">
                            <div key={index+1}>
                                <p className="StayAnlagenamen">Aufenthalt {index}</p>
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

            </div>
            
              
        
        );
    }
}

export default Employee;