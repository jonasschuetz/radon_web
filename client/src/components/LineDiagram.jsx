/*
* Line Chart for the Employeer. 
* Code and Inspiration from:
* https://apexcharts.com/react-chart-demos/line-charts/gradient and
* https://apexcharts.com/react-chart-demos/line-charts/basic/
* https://codepen.io/apexcharts/pen/RvqdPb
*/

import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import { throws } from 'assert';

class LineDiagram extends Component {
   constructor(props) {
       super(props);

       this.state = {
           options: {
            chart: {
                height: 380,
                width:"100%",
                type: "line",
                foreColor: '#6D6D6D'
              },
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#55D479",
                      opacity: 1
                    },
                    {
                      offset: 50,
                      color: "#DBB824",
                      opacity: 1
                    },
                    {
                      offset: 100,
                      color: "#D45555",
                      opacity: 1
                    }
                  ]
                }
              },
              grid: {
                 borderColor: '#6D6D6D'
              },
              xaxis: {
                categories: [
                ]
              }
            },
            series: [{
                name: 'series-1',
                type:  'line',
                data: []
            }] ,
           }
       }

    componentDidMount() {
        this.getStays();
    }

       
    
    getStays = () => {
           const commulated = [];
           const dates = [];
           var helper = 0;
           
           //TOOD: Parameter übergeben, damit dies pro Mitarbeiter gemacht werden kann. 
           var id = this.props.id;
           console.log("id für line "+id);
           var URL = '/api/stay/employee/';
           URL = URL.concat(id);
           console.log(URL);
           fetch(URL)
           .then(res => res.json())
           .then(stays => stays.sort((a,b) => new Date(a.startTime) - new Date(b.startTime)))
           .then(stays => {
               for(var s in stays){
                   var value = parseFloat(helper) + parseFloat(stays[s].dose);
                   helper = value;
                   commulated.push(value.toFixed(2));
                   var date = new Date(stays[s].startTime);                 
                   dates.push((date.getDate()).toString()+"."+(date.getMonth()+1).toString()+"."+(date.getFullYear()).toString());
               }
               console.log(dates);
               console.log(commulated);
               this.updateCharts(commulated, dates);
                })
           }
        
        updateCharts(newData, dates){
            var newSeriesState = [];
           

            var series = this.state.series;
            var xaxis = this.state.options.xaxis;
            console.log(xaxis); 
            const data = newData;   
            newSeriesState.push({data, name: "name", type: 'line' });
            
            //TODO: Correct xAxis. 

            console.log(newSeriesState);
            this.setState({
                series: newSeriesState,
            })
            this.setState({
              options: {
                ...this.state.options,
                xaxis: {
                  ...this.state.options.xaxis,
                  categories: dates
                }
              }
            })
            console.log(dates);
            console.log(series)
        }
           

  
        render() {
  
          return (
            
  
            <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" width="750" />
            </div>
    
  
          );
        }
      }

      export default LineDiagram;
  
       
   