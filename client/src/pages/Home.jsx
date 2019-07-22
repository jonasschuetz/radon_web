import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChartDiagram from '../components/ChartDiagram';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import '../App.css';


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
        .then(emps => emps.sort((a,b) => b.dosis - a.dosis))
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
                <Container className="empContainer">
                <Col>
                <div className="spacerTop" />
                <h1>Mitarbeiter</h1>
                <div className="spacerBetween" />
                <div>
                    <ul>
                    <Row>
                        
                        {this.state.emps.map(function(emp, index){
                            return(
                               
                                 <li>
                                    <div key={index}>
                                   
                                   
                                   <div className = "KleineRadonCard">
                                   <Link to = {`/employee/${emp.id}`}>
                                       <div className="KleineRadonCard-links">
                                       <p className="EmpVornamen">{emp.firstName}</p> 
                                       <p className="EmpVornamen">{emp.lastName}</p>
                                       </div>
                                       <div className="KleineRadonCard-rechts">
                                       <ChartDiagram dose={emp.dosis}/>
                                       </div>
                                       </Link>
                                   </div>
                                   
                                   </div>
                                </li>   

                                
                             
                                  
                                
                            )
                        }
                       
                        )}
                    
                         </Row>
                    </ul>
                    </div>
                    </Col>  
                </Container>
                                
            </div>
        );
    }
}
export default Home;    