import React, { Fragment, useEffect, useState } from "react";
import Search from "../../shared/Search";
import Detail from "./Modal";
import Spinner from "../Spinner";

import { Alert, Button, Col, Row } from "react-bootstrap";

import { gql, useLazyQuery } from "@apollo/client";

type Character = {
  name: String;
  image: String;
};
type EpisodesResult = {
  id: String;
  name: String;
  episode: String;
  air_date: String;
  characters: [Character];
};
type RequestInfo = {
  next: number;
  prev: number;
};
const EPISODES_RICKANDMORTY = gql`
  query($name: String!, $page: Int) {
    episodes(filter: { name: $name }, page: $page) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        episode
        air_date
        characters {
          name
          image
        }
      }
    }
  }
`;

const Episodes = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState<RequestInfo>();
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState(false);
  const [episodeSelected, setEpisodeSelected]: any = useState([]);
  const [characters, setCharacters] = useState([]);

  const handleShowModal = (episode) => {
    setCharacters(episode.characters);
    setEpisodeSelected(episode);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const [getEpisodes, { loading, data, called, error }] = useLazyQuery(
    EPISODES_RICKANDMORTY
  );

  const handleInput = (value) => {
    setQuery(value);
  };

  const prevPage = () => {
    setCurrentPage(info.prev);
  };

  const nextPage = () => setCurrentPage(info.next);
  useEffect(() => {
    if (query.length > 2) {
      getEpisodes({ variables: { name: query, page: currentPage } });
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query, currentPage]);

  useEffect(() => {
    if (!loading && data) {
      let results = data.episodes.results.map((res: EpisodesResult) => {
        return {
          id: res.id,
          name: res.name,
          episode: res.episode,
          air_date: res.air_date,
          characters: res.characters.map((character) => {
            return {
              charname: character.name,
              charimage: character.image,
            };
          }),
        };
      });
      setListData(results);
      setInfo(data.episodes.info);
    }
  }, [loading, data]);

  let resultsSearch = <p>Starting to write</p>;
  if (called && loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div>
        <Alert variant="warning">No results founded</Alert>
      </div>
    );

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <Search onChange={handleInput} />
        </Col>
      </Row>
      <Row>
        <Detail
          handleShow={show}
          episode={episodeSelected}
          characters={characters}
          handleClose={handleClose}
        />
        <Col md={12} style={{ display: "flex", flexWrap: "wrap" }}>
          {listData.length !== 0
            ? listData.map((el, index) => (
                <div
                  style={{
                    border: "1px solid #0991E0",
                    borderRadius: "10px",
                    padding: "4px",
                    margin: "5px",
                  }}
                  key={index}
                >
                  <Button
                    variant="link"
                    onClick={() => handleShowModal(el)}
                    data-toggle="tooltip"
                    title="See more details"
                  >
                    {el.name}
                  </Button>
                  <p style={{ textAlign: "center" }}>
                    <small>Episode: {el.episode}</small>
                  </p>
                </div>
              ))
            : resultsSearch}
        </Col>
      </Row>
      <Row>
        <Col
          md={12}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {listData.length !== 0 ? (
            <>
              <Button
                variant="primary"
                disabled={!info.prev}
                onClick={prevPage}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                disabled={!info.next}
                onClick={nextPage}
              >
                Next
              </Button>
            </>
          ) : null}
        </Col>
      </Row>
    </Fragment>
  );
};
export default Episodes;
