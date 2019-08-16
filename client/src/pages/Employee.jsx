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
      numberOfStays: 0,
      dates: []
    };
  }

  componentDidMount() {
    this.getStays();
    this.getEmp();
    this.getRoom();
  }

  //Holt die Infos zu dem Mitarbeiter
  getEmp = () => {
    var id = this.props.match.params.id;
    fetch(`/api/employee/${id}`)
      .then(res => res.json())
      .then(result => this.setState({ emp: result }));
  };

  //Zieht die Rauminformationen für die Durchschnittliche Belastung
  getRoom = () => {
    fetch("/api/room")
      .then(res => res.json())
      .then(result => this.setState({ rooms: result }));
  };

  //Zieht alle Stays für diesen Mitarbeiter
  getStays = () => {
    var id = this.props.match.params.id;
    fetch(`/api/stay/employee/${id}`)
      .then(res => res.json())
      .then(results => this.calulateDuration(results));
  };

  //Methode welche die Dauer für die einzelnen Aufenthalte als String formatiert.
  //Stays werden in den State stays geschrieben.
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
    this.getDates(stays);
  };
  //Methode, wenn Minuten kleiner als 10 sind. Dann wird eine 0 vorne angefügt.
  //z.B. wird von 9.8 Uhr zu 9.08 Uhr.
  addZero = minutes => {
    if (minutes < 10) {
      minutes = "0".concat(minutes);
    }
    return minutes;
  };

  //Summe aller Aufenthaltszeiten wird berechnet.
  getAllHours = durations => {
    var sum = 0;
    for (var d in durations) {
      sum = sum + durations[d];
    }
    //convert milliseconds to hours.
    if (sum >= 36000) {
      sum = sum / 3600000;
    }
    sum = sum.toFixed(2);
    this.setState({ allHours: sum });
    this.getAverageDuration(sum);
  };

  //Durchschnittlicher Aufenthalt wird in dieser Methode berechnet.
  getAverageDuration = sum => {
    var stays = this.state.stays;
    var averageDur = sum / stays.length;
    averageDur = averageDur.toFixed(2);
    this.setState({ averageDuration: averageDur });
    this.setState({ numberOfStays: stays.length });
  };

  //Formatiertes Datum für jeden Aufenthalt
  getDates = stays => {
    var formattedDates = [];
    for (var s in stays) {
      var date = new Date(stays[s].startTime);
      var dateString =
        date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
      formattedDates[stays[s].id] = dateString;
    }
    this.setState({ dates: formattedDates });
  };

  /*Für jeden Stay wird die durchschnittliche Belastung hinterlegt. Dazu wird ein
  Array angelegt bei welchem die Durchschnittswerte nach room ID hinterlegt werden.*/
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

    return averageValueArray;
  };

  render() {
    var roomAverages = this.getRoomAverageValue();
    var durations = this.state.durations;
    var hours = this.state.allHours;
    var averageDuration = this.state.averageDuration;
    var numOfStays = this.state.numberOfStays;
    var dates = this.state.dates;

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
                <button>Datum</button>
                <button>Dosis</button>
                <button>Anlagen</button>
                <button>Räume</button>
              </div>
              <ul>
                <li>
                  {this.state.stays.map(function(stay, index) {
                    return (
                      <div key={index}>
                        <p className="dateFormat">{dates[stay.id]}</p>
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
                            <p className="dosisLabel">mSv</p>
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
