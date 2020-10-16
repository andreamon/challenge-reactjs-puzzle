import React, { Fragment, useEffect, useState } from "react";
import Search from "../../shared/Search";
import Detail from './Modal';

import { Button, Col, Row, Card } from "react-bootstrap";

import { gql, useLazyQuery } from "@apollo/client";
type CharacterResult = {
  id: String;
  name: String;
  type: String;
  gender: String;
  species: String;
  image: String;
};

const CHARACTERS_RICKANDMORTY = gql`
  query($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        type
        gender
        species
        image
      }
    }
  }
`;

const Characters = () => {
  const [query, setQuery] = useState("");
  const [listData, setListData] = useState([]);

  const [show, setShow] = useState(false);
  const [characterSelected, setCharacterSelected]: any = useState([]);

  const handleShowModal = (character) => {
    setShow(true);
    setCharacterSelected(character);
  };

  const handleClose = () => {
    setShow(false);
  };

  const [getCharacters, { loading, data }] = useLazyQuery(
    CHARACTERS_RICKANDMORTY
  );

  const handleInput = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    if (query.length > 2) {
      getCharacters({ variables: { name: query } });
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query]);

  useEffect(() => {
    if (!loading && data) {
      let results = data.characters.results.map((res: CharacterResult) => {
        return {
          id: res.id,
          name: res.name,
          type: res.type,
          gender: res.gender,
          species: res.species,
          image: res.image,
        };
      });
      setListData(results);
    }
  }, [loading]);

  let resultsSearch = <p>Starting to write</p>;

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <Search onChange={handleInput} />
        </Col>
      </Row>
      <Row>
        <Detail handleShow={show} character={characterSelected} handleClose={handleClose}/>
        <Col md={12} style={{ display: "flex", flexWrap: "wrap" }}>
          {listData.length !== 0
            ? listData.map((el, index) => (
                <Card
                  style={{ width: "12rem", padding: "2px", margin: "5px" }}
                  key={index}
                >
                  <Card.Img variant="top" src={el.image} />
                  <Card.Body>
                    <Button
                      variant="link"
                      onClick={() => handleShowModal(el)}
                      data-toggle="tooltip"
                      title="See more details"
                    >
                      {el.name}
                    </Button>
                  </Card.Body>
                </Card>
              ))
            : resultsSearch}
        </Col>
      </Row>
    </Fragment>
  );
};
export default Characters;
