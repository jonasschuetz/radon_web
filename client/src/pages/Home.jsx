import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChartDiagram from "../components/ChartDiagram";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import "../App.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emps: [],
      ciritcalEmps: []
    };
  }

  getEmpList = () => {
    fetch("/api/employee")
      .then(res => res.json())
      .then(emps => emps.sort((a, b) => b.dosis - a.dosis))
      .then(result => this.ciritcalEmps(result));
  };

  /*Methode erstellt zwei Arrays:
  Eine mit Mitarbeiter mit kritischer Dosis und eine für die anderen Mitarbeiter. 
  */
  ciritcalEmps(employees) {
    var okEmpsArray = [];
    var cirticalEmpsArray = [];
    for (var e in employees) {
      if (employees[e].dosis >= 8.0) {
        cirticalEmpsArray.push(employees[e]);
      } else {
        okEmpsArray.push(employees[e]);
      }
    }
    this.setState({ emps: okEmpsArray });
    this.setState({ ciritcalEmps: cirticalEmpsArray });
  }

  //Lifecycle Method, fetched Data und initialisiert Statevariable.
  componentDidMount() {
    this.getEmpList();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container className="empContainer">
          <Col>
            <div className="spacerTop" />
            <h1>Mitarbeiter mit kritischer Dosis</h1>
            <div className="spacerBetween" />
            <div>
              <ul>
                <Row>
                  {this.state.ciritcalEmps.map(function(emp, index) {
                    return (
                      <div key={index}>
                      <li>
                          <div className="KleineRadonCard">
                            <Link to={`/employee/${emp.id}`}>
                              <div className="KleineRadonCard-links">
                                <p className="EmpVornamen">{emp.firstName}</p>
                                <p className="EmpVornamen">{emp.lastName}</p>
                              </div>
                              <div className="KleineRadonCard-rechts">
                                <ChartDiagram dose={emp.dosis} id={emp.id}/>
                              </div>
                            </Link>
                          </div>
                        
                      </li>
                      </div>
                    );
                  })}
                </Row>
              </ul>
            </div>
            <div className="spacerTop" />
            <h1>Mitarbeiter</h1>
            <div className="spacerBetween" />
            <div>
              <ul>
                <Row>
                  {this.state.emps.map(function(emp, index) {
                    return (
                      <div key={index}>
                      <li>
                          <div className="KleineRadonCard">
                            <Link to={`/employee/${emp.id}`}>
                              <div className="KleineRadonCard-links">
                                <p className="EmpVornamen">{emp.firstName}</p>
                                <p className="EmpVornamen">{emp.lastName}</p>
                              </div>
                              <div className="KleineRadonCard-rechts">
                                <ChartDiagram dose={emp.dosis} id={emp.id}/>
                              </div>
                            </Link>
                          </div>
                      </li>
                      </div>
                    );
                  })}
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
