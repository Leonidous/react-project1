import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar2() {
    const [searchTerm, setSearchTerm] = useState('');

    let navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/Search/${searchTerm}`);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
    <Navbar className="NavBar" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand>Pokédex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Button>Fire</Button>
            </Nav>
            <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchTerm}
                onChange={handleChange}
                aria-label="Search"
            />
            <Button variant="light" type="submit">Search</Button>
            </Form>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}
