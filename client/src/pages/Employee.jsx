import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LineDiagram from "../components/LineDiagram";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stays: [],
      rooms: [],
      emp: 0,
      durations: {},
      allHours: 0,
      averageDuration: 0,
      numberOfStays: 0
    };
  }

  componentDidMount() {
    this.getStays();
    this.getEmp();
    this.getRoom();
  }

  getEmp = () => {
    var id = this.props.match.params.id;
    fetch(`/api/employee/${id}`)
      .then(res => res.json())
      .then(result => this.setState({ emp: result }));
  };

  getRoom = () => {
    fetch("/api/room")
      .then(res => res.json())
      .then(result => this.setState({ rooms: result }));
  };

  getStays = () => {
    var id = this.props.match.params.id;
    fetch(`/api/stay/employee/${id}`)
      .then(res => res.json())
      .then(results => this.calulateDuration(results));
  };

  calulateDuration = stays => {
    stays.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    var workingStays = stays;
    var durationsMapStrings = {};
    var durationsMap = {};
    for (var s in workingStays) {
      var startDate = new Date(workingStays[s].startTime);
      var endDate = new Date(workingStays[s].endTime);
      var duration = endDate.getTime() - startDate.getTime();
      //Get Milliseconds for further calculation.
      durationsMap[workingStays[s].id] = duration;
      //Get Strings for Card.
      var startMinutes = this.addZero(startDate.getMinutes());
      var endMinutes = this.addZero(endDate.getMinutes());

      durationsMapStrings[workingStays[s].id] =
        startDate.getHours() +
        ":" +
        startMinutes +
        " - " +
        endDate.getHours() +
        ":" +
        endMinutes;
    }

    this.setState({ stays: stays });
    this.setState({ durations: durationsMapStrings });
    this.getAllHours(durationsMap);
  };
  addZero = minutes => {
    if (minutes < 10) {
      minutes = "0".concat(minutes);
    }
    return minutes;
  };

  getAllHours = durations => {
    var sum = 0;
    for (var d in durations) {
      sum = sum + durations[d];
    }
    //convert milliseconds to hours.
    if (sum >= 36000) {
      sum = sum / 3600000;
    }
    this.setState({ allHours: sum });
    this.getAverageDuration(sum);
  };

  getAverageDuration = sum => {
    var stays = this.state.stays;
    var averageDur = sum / stays.length;
    averageDur = averageDur.toFixed(2);
    this.setState({ averageDuration: averageDur });
    this.setState({ numberOfStays: stays.length });
  };

  getRoomAverageValue = () => {
    var rooms = this.state.rooms;
    var averageValueArray = [0];
    for (var r in rooms) {
      averageValueArray.splice(
        rooms[r].id,
        0,
        parseFloat(rooms[r].averageValue)
      );
    }
    console.log(averageValueArray);
    return averageValueArray;
  };

  render() {
    var rooms = this.state.rooms;
    var roomAverages = this.getRoomAverageValue();
    var durations = this.state.durations;
    var hours = this.state.allHours;
    var averageDuration = this.state.averageDuration;
    var numOfStays = this.state.numberOfStays;

    console.log(rooms);
    return (
      <div className="App">
        <Navbar />
        <Container className="radonContainer">
          <Row>
            <Col>
              <div className="spacerTop" />
              <h1>
                {this.state.emp.firstName} {this.state.emp.lastName}
              </h1>
              <p>ID: {this.props.match.params.id}</p>
              <div className="spacerBetween" />
              <div>
                <p className="RadonText">
                  Gesamtaufenthaltsdauer: {hours} Stunden
                </p>
                <p className="RadonText">Anzahl Aufenthalte: {numOfStays}</p>
                <p className="RadonText">
                  Ø Aufenthaltsdauer: {averageDuration} Stunden
                </p>
              </div>
              <div className="spacerBetween" />
              <div className="DiagramBox">
                <LineDiagram id={this.props.match.params.id} />
              </div>

              <div className="spacerBetween" />
              <h2>Aufenthalte</h2>
              <div>
                <button>Dosis</button>
                <button>Dosis</button>
                <button>Dosis</button>
                <button>Dosis</button>
              </div>
              <ul>
                <li>
                  {this.state.stays.map(function(stay, index) {
                    return (
                      <div key={index}>
                        <div className="FlacheRadonCard">
                          <div className="FlacheRadonCard-Links">
                            <p className="StayAnlagenamen">
                              Aufenthalt {index + 1}
                            </p>
                            <p className="stayText">Raum: {stay.roomId}</p>
                            <p className="stayText">
                              Aufenthaltsdauer: {durations[stay.id]}
                            </p>
                            <p className="stayText">
                              Ø Belastung: {roomAverages[stay.roomId]} Bq / m3
                            </p>
                          </div>

                          <div className="FlacheRadonCard-Rechts">
                            <p className="dosisText">{stay.dose}</p>
                            <p className="dosisLabel">Bq / m3</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </li>
              </ul> 
              <div>
                <Link to="/">
                  <button>Zurück</button>
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
