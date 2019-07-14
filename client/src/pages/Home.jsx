import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.



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
            <div >
                <Navbar/>
                <Container className="radonContainer">
                <h1>Mitarbeiter</h1>
                <div>
                    <ul>
                        {this.state.emps.map(function(emp, index){
                            return(
                                <Row>
                                    
                                    <div key={index}>
                                   
                                   <Link to = {`/employee/${emp.id}`}>
                                   <div className = "KleineRadonCard">
                                       <p className="EmpVornamen">{emp.firstName}</p> 
                                       <p className="EmpVornamen">{emp.lastName}</p>
                                   </div>
                                   </Link>
                                   </div>


                                </Row>
                             
                                  
                                
                            )
                        }
                        )}
                    </ul>
                </div>
                </Container>
                                
            </div>
        );
    }
}
export default Home;    