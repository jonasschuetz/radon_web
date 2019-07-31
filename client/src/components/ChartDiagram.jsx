/*
*
* 
*
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
        labels: ['msV / 365 Tage'],
      },
      series: [75],
    }
  }

	componentDidMount() {
          this.getDosis();
      }

      getDosis = () => {
          const newDose = [];
          var dose = this.props.dose;
          var colors = [];

          dose = dose * 10; //Prozent von 10 msV / 365 Jahr: Dosis / 10 * 100 => Dosis * 10
          newDose.push(parseFloat(dose));
          if(dose < 50){
            colors = ['#55D479'];
          }
          else if(dose > 80){
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
