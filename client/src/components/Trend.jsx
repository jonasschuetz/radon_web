import React, { Component } from "react";
import trend_up from './trends/trend_up.png';
import trend_flat from './trends/trend_flat.png';
import trend_down from './trends/trend_down.png';

class Trend extends Component {

    constructor(props){
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
      Wenn es mehr als 5 Stays hat, werden die letzten drei Stays zusammengerechnet
      und es wird geschaut wie viel Prozent sie von der Dosis ausmachen. 
      Das Flag wird dann entsprechend gesetzt. 
    */
    calulateTrend = (stays) => {
        stays.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        var anzahlTageFuerTrend = 1;
        if(stays.length >= 3){
            var counter = (stays.length-1) - anzahlTageFuerTrend;
            var sum = 0;
             while(counter < (stays.length-1)){
                var stay = stays[counter]
                sum = sum + stay.dose;
                counter++;
            }
           
            var dose = parseFloat(this.props.dose);

            if(dose !== 0 && sum !== 0){
                var factor = ((sum / dose)*100).toFixed(2);
            }else{
                factor = sum;
            }
            
            if(factor === 0 ){
                this.setState({trend: 0});
            }else if(factor <= 10){
                this.setState({trend: 1});
            }else if(factor > 10) {
                this.setState({trend: 2});
            }
        }
        else{
            this.setState({trend:trend_up});
        }
        
    }

    render(){
        var trend = this.state.trend;

        switch(trend){
            case 0: 
            return(
                <img className="logos" src={trend_down} alt="Trend"/>
                )   
            case 1:
                    return(
                        <img className="logos" src={trend_flat} alt="Trend"/>
                    )
                 
            case 2:
                    return(
                        <img className="logos" src={trend_up} alt="Trend"/>
                    )
                   
            default: 
            
                    return(
                            <img className="logos" src={trend_flat} alt="Trend"/>
                        
                    )
                   
        }
    }

}
export default Trend;