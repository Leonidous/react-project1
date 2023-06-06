import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import useArrayFetch from '../Hooks/PokeArrayApi';
import PokeImgCarousel from './PokeImgCarousel';
import MovesTable from './MovesTable';
import TypeChart from './TypeDefences';
import PokeDexInfoTable from './PokeDexInfo';
import PokeChart2 from './PokeChart2';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../Themes/Themecontext';
import { useContext} from 'react';

export function PokeCard() {
    const {pokemon} =  useParams();
    const [pokemoninfo, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);

    let moveEndpoints = [];
    let abilityEndpoints = [];
    let typeEndpoints = [];

    if(pokemoninfo?.moves && pokemoninfo.moves.length > 0){
        pokemoninfo.moves.map((moveObj) => 
        moveEndpoints.push(moveObj.move.url)
        )
        pokemoninfo.abilities.map((abObj) => 
        abilityEndpoints.push(abObj.ability.url)
        )
        pokemoninfo.types.map((typeObj) => 
        typeEndpoints.push(typeObj.type.url)
        )
    }

    const { theme } = useContext(ThemeContext);

    import(`../Themes/${theme}-theme.css`);

    const [abilityInfo] = useArrayFetch(abilityEndpoints);
    const [MovesInfo] = useArrayFetch(moveEndpoints);
    const [typeInfo] = useArrayFetch(typeEndpoints);

    let statLabels = [];

    if(!(Object.keys(pokemoninfo).length === 0)){
        for(let i in pokemoninfo.stats){
            statLabels[i]=(pokemoninfo.stats[i].stat.name+' ('+pokemoninfo.stats[i].base_stat+')');
        }
    }

    if(!(Object.keys(pokemoninfo).length === 0)){
        console.log(abilityInfo);
        return (
            <Container fluid className='pokecard-page pt-3 pb-3'>
                <Container className='pokecard-grid mt-3 border border-5'>
                    <h1 className='PokeCardTitle pb-0'>{pokemoninfo.name}</h1>
                    <Row className='px-2'>
                        <Col>
                            <Container className='pokeDataContainer'>
                                <PokeImgCarousel 
                                    normal={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemoninfo.id+'.png'} 
                                    shiny={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemoninfo.id+'.png'}
                                />
                                <PokeDexInfoTable PokeInfo = {pokemoninfo}/>
                            </Container>
                        </Col>
                    </Row>
                    <Row className='pt-4 px-2'>
                        <Col>
                            <PokeChart2 stats={pokemoninfo.stats}/>
                        </Col>
                        <Col>
                            <MovesTable Movelist={MovesInfo}/>
                        </Col>
                    </Row>
                    <Row className='pt-4 px-2 pb-4'>
                        <Col>
                            <TypeChart types={typeInfo}/>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }

    /*What to add:
    -Pokemon Sprites (maybe be able to cycle through all of them?)
    -Graph of pokemon stats (DONE)
    -Moves (in collapsible/scrollable list, will also show flavor text and what version learned in) (DONE)
    -Types with little type icons (DONE)
    -Add type defenses (DONE)
    -add egg groups
    -add pokemon flavor text
    -add evolutions
    -add hidden ability
    -add ability flavor text (DONE)
    -add generational learnset
    */
}