import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import fallbackimg from '../Images/FallbackImage.png'
import '../App.css'

export default function PokeImgCarousel(img) {

    const onMediaFallback = event => event.target.src = fallbackimg;

    return ( 
        <div className='pokeImgCarouselContainer'>
            <Carousel interval={null}>
                <Carousel.Item className="w-500px">
                        <img
                            className="d-block w-auto"
                            src={img.normal}
                            alt="normal"
                            onError={onMediaFallback}
                        />
                    <Carousel.Caption>
                        <h3 className='Carousel-text'>Regular Form</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="w-500px">
                        <img
                            className="d-block w-auto"
                            src={img.shiny}
                            alt="shiny"
                            onError={onMediaFallback}
                        />
                    <Carousel.Caption>
                        <h3 className='Carousel-text'>Shiny Form</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
