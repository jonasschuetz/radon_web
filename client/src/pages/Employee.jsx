import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
            <div>
                <ul>
                    {this.state.stays.map(function(stay, index) {
                        return(
                            <div key={index+1}>
                                <h1>Aufenthalt {index}</h1>
                                <p>{stay.startTime}</p>
                                <p>{stay.endTime}</p>
                                <p>{stay.dose}</p>
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