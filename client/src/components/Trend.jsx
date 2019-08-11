import React, { Component } from "react";
import trend_up from './trends/trend_up.png';
import trend_flat from './trends/trend_flat.png';
import trend_down from './trends/trend_down.png';
import moment from "moment";

class Trend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trend: null
        }
    }

    componentDidMount() {
        this.getStays();
    }

    getStays = () => {
        var id = this.props.id;
        fetch(`/api/stay/employee/${id}`)
            .then(res => res.json())
            .then(results => this.calulateTrend(results));
    };

    /*Berechne Trend: 
      Es werden die Aufenthalte der letzten drei Tage zusammengerechnet und ins Verhältnis 
      mit der Dosis gesetzt. 
      Ist das Verhältnis kleiner gleich 0 wird ein Abwärtstrend dargestellt.
      Ist das Verhältnis zwischen 0 und 8 Prozent wird ein flacher Trend dargestellt. 
      Ist das Verhältnis über 8 Prozent wird ein Aufwärtstrend dargestellt. 
    */
    calulateTrend = (stays) => {
        stays.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        var anzahlTageFuerTrend = 3;
        var timeStamp = moment().subtract(anzahlTageFuerTrend, 'days').unix();
        var sum = 0;
        for (var s in stays){
            var stayDate = moment(stays[s].startTime);
            if(stayDate.unix() > timeStamp){
                sum = sum + stays[s].dose;
            }
        }
        var dose = parseFloat(this.props.dose);

        if (dose !== 0 && sum !== 0) {
            var factor = ((sum / dose) * 100).toFixed(2);
        } else {
            factor = sum;
        }

        if (factor <= 0) {
            this.setState({ trend: 0 });
        } else if (factor <= 8) {
            this.setState({ trend: 1 });
        } else if (factor > 8) {
            this.setState({ trend: 2 });
        }
        else {
        this.setState({ trend: 2 });
        } 
    }

    render() {
        var trend = this.state.trend;

        switch (trend) {
            case 0:
                return (
                    <img className="logos" src={trend_down} alt="Trend" />
                )
            case 1:
                return (
                    <img className="logos" src={trend_flat} alt="Trend" />
                )
            case 2:
                return (
                    <img className="logos" src={trend_up} alt="Trend" />
                )
            default:
                return (
                    <img className="logos" src={trend_flat} alt="Trend" />

                )

        }
    }

}
export default Trend;