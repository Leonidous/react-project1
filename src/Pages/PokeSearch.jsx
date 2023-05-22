import * as React from 'react';
import useFetch from '../Hooks/Pokeapi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import fallbackimg from '../Images/FallbackImage.png';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export function PokeSearcher (){

    const {search} =  useParams();
    const [searchData, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const  pokeSearchResults = [];
    
    for(let i in searchData.results){
        if((searchData.results[i].name).toLowerCase().includes(search.toLowerCase())){
            pokeSearchResults.push({name: searchData.results[i].name, url: searchData.results[i].url});
        }
    }

    return(
        <>
            <h1 style={{textAlign: 'center'}}>Search Results for: '{search}'</h1> 

            <Container fluid className='poke-cards'>
                <Row xs={1} sm={2} md={4} lg={6}>
                    {pokeSearchResults.map((pokemon, index) => (
                        <Col key={index} className='pb-3'>
                            <Link to={'/' + pokemon.name} className='pokecard-link'>
                                <Card>
                                    <Card.Img variant='top' src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+(Imageid(pokemon.url))+'.png'} onError={event => {event.target.src = fallbackimg;}}/>
                                    <Card.Body>
                                        <Card.Title>{pokemon.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

function Imageid(ImageUrl) {
  
    const parts = ImageUrl.split("/");
    const result = parts[parts.length - 2];
    
    return result;
  }