import React, { Fragment, useEffect, useState } from "react";
import Search from "../../shared/Search";
import Detail from "./Modal";

import { Button, Col, Row } from "react-bootstrap";

import { gql, useLazyQuery } from "@apollo/client";

type Character = {
  name: String;
  image: String;
};
type LocationsResult = {
  id: String;
  name: String;
  type: String;
  dimension: String;
  residents: [Character];
};

const LOCATIONS_RICKANDMORTY = gql`
  query($name: String!) {
    locations(filter: { name: $name }) {
      results {
        id
        name
        type
        dimension
        residents {
          name
          image
        }
      }
    }
  }
`;

const Locations = () => {
  const [query, setQuery] = useState("");
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState(false);
  const [locationSelected, setLocationSelected]: any = useState([]);
  const [residents, setResidents] = useState([]);

  const handleShowModal = (location) => {
    setResidents(location.residents);
    setLocationSelected(location);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const [getLocations, { loading, data }] = useLazyQuery(
    LOCATIONS_RICKANDMORTY
  );
  const handleInput = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    if (query.length > 2) {
      getLocations({ variables: { name: query } });
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query]);

  useEffect(() => {
    if (!loading && data) {
      let results = data.locations.results.map((res: LocationsResult) => {
        return {
          id: res.id,
          name: res.name,
          type: res.type,
          dimension: res.dimension,
          residents: res.residents.map((resident) => {
            return {
              resname: resident.name,
              resimage: resident.image,
            };
          }),
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
        <Detail
          handleShow={show}
          location={locationSelected}
          residents={residents}
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
                  <p style={{textAlign:"center"}}>
                    <small>{el.dimension}</small>
                  </p>
                </div>
              ))
            : resultsSearch}
        </Col>
      </Row>
    </Fragment>
  );
};
export default Locations;
