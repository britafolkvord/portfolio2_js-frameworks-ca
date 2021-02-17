import React, { useState, useEffect } from 'react';
import { Spinner, Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GameSearch from './searchGames';
import { BASE_URL } from '../constants/api';

const Status = {
    Loading: 0,
    Success: 1,
    Error: 2,
};

function GameList() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [status, setStatus] = useState(Status.Loading);

    useEffect(() => {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((json) => {
                if (json.error) {
                    throw new Error('Error fetching games');
                } else {
                    setGames(json.results);
                    setFilteredGames(json.results);
                    setStatus(Status.Success);
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus(Status.Error);
            });
    }, []);

    const filterGames = function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredArray = games.filter(function (game) {
            const lowerCaseName = game.name.toLowerCase();
            if (lowerCaseName.includes(searchValue)) {
                return true;
            }
            return false;
        });
        setFilteredGames(filteredArray);
    };

    return (
        <div className="lol">
            <GameSearch handleSearch={filterGames} />
            {status === Status.Error ? <h2>Something went wrong fetching games. Try refreshing the page</h2> : null}
            {status === Status.Loading ? <Spinner animation="border" className="spinner" /> : null}
            <div className="cardsContainer">
                {filteredGames.map((game) => {
                    const { id, name, background_image, rating, released } = game;
                    return (
                        <React.Fragment key={id}>
                            {status === Status.Success ? (
                                <Card>
                                    <Card.Img variant="top" src={background_image} />
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Rating: {rating}</ListGroup.Item>
                                            <ListGroup.Item>Released: {released}</ListGroup.Item>
                                        </ListGroup>
                                        <Link to={'../game/' + id}>
                                            <Button variant="primary" block>
                                                Game Details
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            ) : null}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default GameList;
