import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
    indexAxis: 'y',
    responsive: true,
    elements: {
        bar: {
            borderWidth: 2,
            backgroundColor: '#e4000f',
            borderColor: '#880808',
        }
    },
    plugins: {
        title: {
            display: true,
            text: 'Pokemon Stats',
          },
        legend: {
            display: false,
        },
    }
};


function PokeChart ({stats}){

    return <Bar data={stats} options={options}/>
    
}

export default PokeChart;