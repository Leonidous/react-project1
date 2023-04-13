import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js/auto';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        bar: {
            borderWidth: 3,
            inflateAmount: 8.8,
        }
    },
    plugins: {
        title: {
            display: true,
            text: 'Pokémon Base Stats',
            color: 'black',
            textStrokeWidth: 5,
            textStrokeColor: 'white',
            font: {
                weight: 'bold',
                size: 14,
            },
          },
        legend: {
            display: false,
        },
    },
    layout: {
        padding: {
            right: 25,
            top: 20,
        }
    },
    scales: {
        y: {
            ticks: {
                color: 'black',
                showLabelBackdrop: false,
                textStrokeWidth: 3,
                textStrokeColor: 'white',
                font: {
                    weight: 'bold',
                    size: 14,
                }
            },
            border: {
                display: false,
            },
            grid: {
                borderColor: 'black',
                borderWidth: 1,
                borderDash: [1, 0],
                drawTicks: false,
                color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
                showLabelBackdrop: true,
            }
        },
        x: {
            display: false,
        },
    },
};


function PokeChart ({stats}){

    return <div className='pokeChartContainer'><Bar data={stats} options={options}/></div>
    
}

export default PokeChart;