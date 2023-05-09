import * as React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import PokeContentGen2 from './PokeContentGen2';
import { createBrowserHistory } from '@remix-run/router';
import { useEffect } from 'react';
import useFetch from '../Hooks/Pokeapi';
import qs from 'qs';

export default function PokePager() {

    const [page, setPage] = React.useState(1);
    const [perPage, setperPage] = React.useState(24);

    const handleClick = (event) => {
        return setPage(Number(event.target.text));
    };

    const handlePrev = () => {
        return setPage(page-1);
    }
    const handleNext = () => {
        return setPage(page+1);
    }

    const handlePerPage = (event) => {
        return setperPage(Number(event.target.text));
    }
    
    //Preserve page state using browser history VVVVVVV
    const history = createBrowserHistory();

    useEffect(() => {
      const filterParams = history.location.search.substr(1);
      const filtersFromParams = qs.parse(filterParams);
      if (filtersFromParams.page && !(isNaN(filtersFromParams.page))) {
        setPage(Number(filtersFromParams.page));
      }
    }, []);

    useEffect(() => {
        history.push(`?page=${page}`);
    }, [page]);
    //Preserve page state using browser history ^^^^^

    //Preserve perPage state using local storage VVVVVV
    useEffect(() => {
      setperPage(JSON.parse(window.localStorage.getItem('perPage')));
    }, []);
  
    useEffect(() => {
      window.localStorage.setItem('perPage', perPage);
    }, [perPage]);
    //Preserve page state using browser history ^^^^^

    const [pageCheck, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');

    const pages = (Math.ceil((pageCheck.count)/(perPage)));

    if(page>pages){
        setPage(pages);
    }

    let pageArray = [];

    if(pageCheck.count){

        pageArray.push(
            <Pagination.Prev
            key="prev"
            disabled={page === 1}
            onClick={handlePrev}
            />
        )

        if(page < pages-4){

            if(page==1){
                for(let i = Math.max(1, page); i <= Math.min(pages, page + 4); i++){
                    pageArray.push(
                        <Pagination.Item key={i} onClick={handleClick} active={page===i}>{i}</Pagination.Item>
                    )
                }
            }
            
            if(page==2){
                for(let i = page-1; i <= Math.min(pages, page + 3); i++){
                    pageArray.push(
                        <Pagination.Item key={i} onClick={handleClick} active={page===i}>{i}</Pagination.Item>
                    )
                }
            }

            if(page>2){
                if(page>3){
                    pageArray.push(
                        <Pagination.Item key={1} onClick={handleClick}>{1}</Pagination.Item>,
                        <Pagination.Ellipsis key="ellipsis-start" />
                    )
                }
                for(let i = page-2; i <= Math.min(pages, page + 2); i++){
                    pageArray.push(
                        <Pagination.Item key={i} onClick={handleClick} active={page===i}>{i}</Pagination.Item>
                    )
                }
            }

            pageArray.push(
                <Pagination.Ellipsis key="ellipsis-end" />,
                <Pagination.Item key={pages} onClick={handleClick}>{pages}</Pagination.Item>
            );
        }else{
            pageArray.push(
                <Pagination.Item key={1} onClick={handleClick}>{1}</Pagination.Item>,
                <Pagination.Ellipsis key="ellipsis-start" />
            );
            pageArray.push(
                <Pagination.Item key={pages-4} onClick={handleClick} active={page===pages-4}>{pages-4}</Pagination.Item>,
                <Pagination.Item key={pages-3} onClick={handleClick} active={page===pages-3}>{pages-3}</Pagination.Item>,
                <Pagination.Item key={pages-2} onClick={handleClick} active={page===pages-2}>{pages-2}</Pagination.Item>,
                <Pagination.Item key={pages-1} onClick={handleClick} active={page===pages-1}>{pages-1}</Pagination.Item>,
                <Pagination.Item key={pages} onClick={handleClick} active={page===pages}>{pages}</Pagination.Item>
            )
        }

        pageArray.push(
            <Pagination.Next
            key="next"
            disabled={page === pages}
            onClick={handleNext}
            />
        )

        return (
            <>  
                <Container className='pokepager-container'>
                        <Pagination>
                            {pageArray}
                        </Pagination>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select Pokémon Per Page ({perPage})
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handlePerPage}>24</Dropdown.Item>
                            <Dropdown.Item onClick={handlePerPage}>48</Dropdown.Item>
                            <Dropdown.Item onClick={handlePerPage}>72</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                <PokeContentGen2 page={page} pokePerPage={perPage}/>
            </>
        );
    }
}