import React, { Fragment, useEffect, useState } from "react";
import Search from "../../shared/Search";
import Detail from "./Modal";
import Spinner from "../Spinner";

import { Button, Col, Row, Alert } from "react-bootstrap";

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
type RequestInfo = {
  next: number;
  prev: number;
};

const LOCATIONS_RICKANDMORTY = gql`
  query($name: String!, $page: Int) {
    locations(filter: { name: $name }, page: $page) {
      info {
        pages
        count
        next
        prev
      }
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
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState<RequestInfo>();
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

  const [getLocations, { loading, data, called, error }] = useLazyQuery(
    LOCATIONS_RICKANDMORTY
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
      getLocations({ variables: { name: query, page: currentPage } });
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query,currentPage]);

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
      setInfo(data.locations.info);
    }
  }, [loading,data]);

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
                  <p style={{ textAlign: "center" }}>
                    <small>{el.dimension}</small>
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
export default Locations;
