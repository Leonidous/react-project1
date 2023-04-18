import React from 'react'
import '../App.css'

export default function PokeChart2(stats) {
    let pokeStats = stats.stats;
    return (
        <>  
            <div className='statsTableDiv'>
                <table className='statsTable'>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th>HP</th>
                            <td className='cellNum'>{pokeStats[0].base_stat}</td>
                            <td className='cellBar'>
                                <div style={{width: `${(pokeStats[0].base_stat/1.799)}%`}} className='barchartBar hpBar'></div>
                            </td>
                            <td className='cellNum'>{(Math.floor(pokeStats[0].base_stat*2)*100/100+100+10)}</td>
                            <td className='cellNum'>{Math.floor(pokeStats[0].base_stat*2+204)}</td>
                        </tr>
                        <tr>
                            <th>Attack</th>
                            <td className='cellNum'>{pokeStats[1].base_stat}</td>
                            <td className='cellBar'>
                                <div style={{width: `${(pokeStats[1].base_stat/1.799)}%`}} className='barchartBar atkBar'></div>
                            </td>
                            <td className='cellNum'>{Math.floor(Math.floor((pokeStats[1].base_stat*2)*1+5)*0.9)}</td>
                            <td className='cellNum'>{Math.floor((pokeStats[1].base_stat*2+99)*1.1)}</td>
                        </tr>
                        <tr>
                            <th>Defense</th>
                            <td className='cellNum'>{pokeStats[2].base_stat}</td>
                            <td className='cellBar'>
                                <div style={{width: `${(pokeStats[2].base_stat/1.799)}%`}} className='barchartBar defBar'></div>
                            </td>
                            <td className='cellNum'>{Math.floor(Math.floor((pokeStats[2].base_stat*2)*1+5)*0.9)}</td>
                            <td className='cellNum'>{Math.floor((pokeStats[2].base_stat*2+99)*1.1)}</td>
                        </tr>
                        <tr>
                            <th>Sp. Atk</th>
                            <td className='cellNum'>{pokeStats[3].base_stat}</td>
                            <td className='cellBar'>
                                <div style={{width: `${(pokeStats[3].base_stat/1.799)}%`}} className='barchartBar spAtkBar'></div>
                            </td>
                            <td className='cellNum'>{Math.floor(Math.floor((pokeStats[3].base_stat*2)*1+5)*0.9)}</td>
                            <td className='cellNum'>{Math.floor((pokeStats[3].base_stat*2+99)*1.1)}</td>
                        </tr>
                        <tr>
                            <th>Sp. Def</th>
                            <td className='cellNum'>{pokeStats[4].base_stat}</td>
                            <td className='cellBar'>
                                <div style={{width: `${(pokeStats[4].base_stat/1.799)}%`}} className='barchartBar spDefBar'></div>
                            </td>
                            <td className='cellNum'>{Math.floor(Math.floor((pokeStats[4].base_stat*2)*1+5)*0.9)}</td>
                            <td className='cellNum'>{Math.floor((pokeStats[4].base_stat*2+99)*1.1)}</td>
                        </tr>
                        <tr>
                            <th>Speed</th>
                            <td className='cellNum'>{pokeStats[5].base_stat}</td>
                            <td className='cellBar'>
                                <div style={{width: `${(pokeStats[5].base_stat/1.799)}%`}} className='barchartBar spdBar'></div>
                            </td>
                            <td className='cellNum'>{Math.floor(Math.floor((pokeStats[5].base_stat*2)*1+5)*0.9)}</td>
                            <td className='cellNum'>{Math.floor((pokeStats[5].base_stat*2+99)*1.1)}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <td className='cellnum cellTotal'>{pokeStats[0].base_stat+pokeStats[1].base_stat+pokeStats[2].base_stat+pokeStats[3].base_stat+pokeStats[4].base_stat+pokeStats[5].base_stat}</td>
                            <th className='cellBar'></th>
                            <th>Min</th>
                            <th>Max</th>
                        </tr>
                    </tfoot>
                </table>
                <div><p>The ranges shown on the right are for a level 100 Pokémon. Max values are based on a beneficial nature, maximum EVs and IVs; minimum values are based on a hindering nature, minimum EVs and IVs.</p></div>
            </div>
        </>
    )
}
