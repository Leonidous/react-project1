import React from 'react';
import useFetch from '../Hooks/Pokeapi';
import fallbackimg from '../Images/FallbackImage.png';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import '../App.css';

export default function PokeContentGen2(page) {

    console.log('hello');

    const onMediaFallback = event => event.target.src = fallbackimg;

    const CurrentPage = page.page;
    const PerPage = page.pokePerPage;

    const [pokemons, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit='+(PerPage)+'&offset='+(((CurrentPage)-1)*PerPage));

    if(pokemons.results){
        return (
          <>
            <Container fluid className='poke-cards'>
            <Row xs={1} sm={2} md={4} lg={6}>
                {pokemons.results.map((pokemon, index) => (
                    <Col>
                        <Link to={'/' + pokemon.name} className='pokecard-link'>
                            <Card>
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

    const id = ImageUrl;
  
    const parts = ImageUrl.split("/");
    const result = parts[parts.length - 2];
  
    const Image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ result +'.png';
  
    return Image;
  }
  
