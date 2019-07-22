/*
*
* 
*
*/
import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';

class ChartDiagram extends Component {
      
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          radialBar: {
            startAngle:0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                bottom:3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: false,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              name: {
                offsetY: 20,
                show: true,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                formatter: function (val) {
                  return (parseFloat(val)/10);
                },
                offsetY: -20,
                color: '#111',
                fontSize: '36px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            colorStops: [
              {
                offset: 0,
                color: "#FFF",
                opacity: 1
              },
            ],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1
          }
        },
        stroke: {
          lineCap: 'flat'
        },
        labels: ['msV / 365 Tage'],
      },
      series: [],
    }
  }
	componentDidMount() {
          this.getDosis();
      }

      getDosis = () => {
          const newDose = [];
          var dose = this.props.dose;
          var colorStops = this.state.options.fill.gradient.colorStops;
          var color = "";

          dose = dose * 10; //Prozent von 10 msV / 365 Jahr: Dosis / 10 * 100 => Dosis * 10
          newDose.push(parseFloat(dose));
          if(dose < 50){
            color = "#55D479"
            colorStops.push({offset: 0, color, opacity:1 })
          }
          else if(dose > 80){
            color = "#D45555"
            colorStops.push({offset: 0, color, opacity:1 })
          } 
          else {
            color = "#DBB824"
            colorStops.push({offset: 0, color, opacity:1 })
          }
          this.setState({series: newDose});

      }

  render() {
    return (
      

      <div id="card">
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height="300" width="300" />
        </div>
      </div>


    );
  }
}
    export default ChartDiagram;
