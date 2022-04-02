import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

class FireGraph extends Component {
    
    render() {
        // Calculate data points based on fire number and years to fire
        const dataLabels = [];
        for (let i = 0; i < parseInt(this.props.yearsUntilFire, 10) + 1; i++) {
            dataLabels.push(i + '');
        }
        dataLabels.push(this.props.yearsUntilFire + '');
        const chartData = {
            labels: dataLabels,
            datasets: [
                {
                    label: 'Net Worth at Year',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.netWorths
                }
            ]
        };
        const chartOptions = {
            scales: {
                x: 
                {
                    title: {
                        display: true,
                        text: 'Year'
                    },
                    id: 'Year',
                    position: 'bottom',
                    ticks: {
                        beginAtZero: true
                    }
                },
                y:
                {
                    title: {
                        display: true,
                        text: 'Net Worth ($)'
                    },
                    postion: 'left',
                    id: 'Net Worth',
                    ticks: {
                        beginAtZero: true
                    }
                },
            }
        }
        return (
            <div>
                <h4>My Financial Independence Number is ${this.props.fireNumber}</h4>
                <h4>{this.props.yearsUntilFire} Years Until Financial Independence</h4>
                <Line data={chartData} options={chartOptions}/>
            </div>
        )
    }
}

export default FireGraph;