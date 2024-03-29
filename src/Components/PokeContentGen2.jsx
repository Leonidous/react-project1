import React from 'react';
import useFetch from '../Hooks/Pokeapi';
import fallbackimg from '../Images/FallbackImage.png';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export default function PokeContentGen2(page) {

    const CurrentPage = page.page;
    const PerPage = page.pokePerPage;

    const [pokemons, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit='+(PerPage)+'&offset='+(((CurrentPage)-1)*PerPage));

    if(pokemons.results){
        return (
          <>
            <Container className='poke-cards'>
                <Row xs={1} sm={2} md={4} lg={6}>
                    {pokemons.results.map((pokemon, index) => (
                        <Col key={index} className='pb-3'>
                            <Link to={'/' + pokemon.name} className='pokecard-link'>
                                <Card className='poke-card'>
                                    <Card.Img variant='top' src={PokeImage(pokemon.url)} onError={event => {event.target.src = fallbackimg;}}/>
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
        );
      }
}

function PokeImage(ImageUrl) {
  
    const parts = ImageUrl.split("/");
    const result = parts[parts.length - 2];
  
    const Image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ result +'.png';
  
    return Image;
  }
  
