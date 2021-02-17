import React, { useState, useEffect } from "react";
import {Spinner, Button, Card, ListGroup, Col, Row, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

import GameSearch from "./searchGames";
import { BASE_URL } from "../constants/api";

function GameList() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((json) => {
        setGames(json.results);
        setFilteredGames(json.results);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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

  if (loading) {
    return <Spinner animation="border" className="spinner" />;
  }

  return (
    <Container fluid>
      <GameSearch handleSearch={filterGames} />
      <Row>
        {filteredGames.map((game) => {
          const { id, name, background_image, rating, released } = game;

          return (
            <Col sm={6} md={3} key={id}>
              <Card style={{ minWidth: "18rem" }}>
                <Card.Img variant="top" src={background_image} />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Rating: {rating}</ListGroup.Item>
                    <ListGroup.Item>Released: {released}</ListGroup.Item>
                  </ListGroup>
                  <Link to={"../game/" + id}>
                    <Button variant="primary">Game Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default GameList;
