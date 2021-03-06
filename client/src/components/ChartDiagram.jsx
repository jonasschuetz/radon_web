/*
* Donut Chart für die Mitarbeiter Cards. 
* Code Inspiration von:
* https://apexcharts.com/react-chart-demos/radialbar-charts/basic/ und
* https://apexcharts.com/react-chart-demos/radialbar-charts/gradient/ 
*/
import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import Trend from "../components/Trend";

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
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: '70%',
              position: 'front',
              dropShadow: {
                enabled: false,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              
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
                  return (parseFloat(val)/10).toFixed(2);
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
          colors: [],
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['mSv / 365 Tage'],
      },
      series: [75],
    }
  }

	componentDidMount() {
          this.getDosis();
      }

      /*Dosis wird vom HTTP Server geholt. Die Farbe des Donut Charts wird anschliessend über die 
      über Prozentzahl definiert*/
      getDosis = () => {
          const newDose = [];
          var dose = parseFloat(this.props.dose);
          dose = dose.toFixed(1);
          var colors = [];

          
          dose = dose * 10; //Prozent von 10 msV / 365 Jahr: Dosis / 10 * 100 => Dosis * 10
          newDose.push(dose);
          if(dose < 70){
            colors = ['#55D479'];
          }
          else if(dose > 90){
            colors = ['#D45555'];
          } 
          else {
            colors = ['#DBB824'];
          }
          this.setState({series: newDose});
          this.setState({options: {
            ...this.state.options,
          fill: {
            ...this.state.options.fill,
            colors: colors
          }
        }});

      }

  render() {
    return (
      

      <div id="card">
        <div id="chart">
          <Trend id={this.props.id} dose={this.props.dose}/>
          <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height="300" width="300" />
        </div>
      </div>


    );
  }
}
    export default ChartDiagram;
