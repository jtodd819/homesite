import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class FireGraph extends Component {
    render() {
        // Calculate data points based on fire number and years to fire
        const yearLabels = [];
        const valuesAtYear = [];
        for (let i = 0; i < parseInt(this.props.yearsUntilFire, 10); i++) {
           yearLabels.push(i + '');
           valuesAtYear.push((i / this.props.yearsUntilFire) * this.props.fireNumber);
        }
        yearLabels.push(this.props.yearsUntilFire);
        valuesAtYear.push(this.props.fireNumber);

        var chartData = {
            labels: yearLabels,
            datasets: [
                {
                    label: 'Years Until Financial Independence',
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
                    data: valuesAtYear
                }
            ]
        };
        return (
            <div>
                <h1>Financial Independence Graph</h1>
                <h2>My Financial Independence Number: ${this.props.fireNumber}</h2>
                <h2>Years Until Financial Indpendence</h2>
                <Line data={chartData}/>
            </div>
        )
    }
}

export default FireGraph;