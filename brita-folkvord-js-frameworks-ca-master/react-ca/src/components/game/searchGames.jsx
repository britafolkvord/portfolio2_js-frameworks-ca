import React from "react";
import PropTypes from "prop-types";
import {InputGroup, FormControl} from "react-bootstrap";

export default function GameSearch({ handleSearch }) {
  return (
    <InputGroup className="search">
      <FormControl
        placeholder="Search for game by name..."
        onChange={(event) => handleSearch(event)}
      />
    </InputGroup>
  );
}

GameSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
