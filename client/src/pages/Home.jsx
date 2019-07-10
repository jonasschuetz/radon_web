import React, {Component} from 'react';
import { Link } from 'react-router-dom';



class Home extends Component {


    constructor(props){
        super(props);

        this.state = {
            'emps': []
        }
    }
    
    getEmpList = () => {
        fetch('/api/employee')
        .then(res => res.json())
        .then(result => this.setState({'emps': result }))
    }  
 
   

    //Lifecycle Method, fetched Data und initialisiert Statevariable. 
    componentDidMount () {
       this.getEmpList();
    }


    render(){
        return (
            <div className="App">
                <h1>Mitarbeiter</h1>
                <div>
                    <ul>
                        {this.state.emps.map(function(emp, index){
                            return(
                                <div key={index}>
                                    <Link to = {'./employee'}>
                                        <button variant = "raised">
                                            Mitarbeiter {index}
                                        </button>
                                    </Link>
                                </div>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Home;    