/*
* Line Chart for the Employeer. 
* Code and Inspiration from:
* https://apexcharts.com/react-chart-demos/line-charts/gradient and
* https://apexcharts.com/react-chart-demos/line-charts/basic/
* https://codepen.io/apexcharts/pen/RvqdPb
*/

import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class LineDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 380,
          width: "100%",
          type: "line",
          foreColor: '#6D6D6D',
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "horizontal",
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: [
              {
                offset: 0,
                color: "#315a68",
                opacity: 1
              },
              {
                offset: 50,
                color: "#315a68",
                opacity: 1
              },
              {
                offset: 100,
                color: "#315a68",
                opacity: 1
              }
            ]
          }
        },
        grid: {
          borderColor: '#e9e9e9'
        },
        xaxis: {
          categories: [
          ]
        },
        yaxis: {
          forceNiceScale: true,
          min: 0,
          max: 20
        }
      },
      series: [{
        name: 'series-1',
        type: 'line',
        data: []
      }],
    }
  }

  componentDidMount() {
    this.getStays();
  }



  getStays = () => {
    const commulated = [];
    const dates = [];
    var helper = 0;


    var id = this.props.id;
    var URL = '/api/stay/employee/';
    URL = URL.concat(id);

    fetch(URL)
      .then(res => res.json())
      .then(stays => stays.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)))
      .then(stays => {
        for (var s in stays) {
          helper = parseFloat(helper) + parseFloat(stays[s].dose);
          commulated.push(helper.toFixed(2));
          var date = new Date(stays[s].startTime);
          dates.push((date.getDate()).toString() + "." + (date.getMonth() + 1).toString() + "." + (date.getFullYear()).toString());
        }
        this.updateCharts(commulated, dates);
      })
  }

  updateCharts(data, dates) {
    var newSeriesState = [];
    newSeriesState.push({ data, name: "name", type: 'line' });

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



