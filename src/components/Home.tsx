import React, { FC, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters";
import Characters from "./Characters/Characters";
import Locations from "./Locations/Locations";
import Episodes from "./Episodes/Episodes";

const Home: FC = () => {
  const [typeFilter, setTypeFilter] = useState("");

  // esta función captura la opción que se eligió en el radio button (Characters, Locations, Episodes)
  const handleCheck = (value) => {
    setTypeFilter(value);
  };

  const showSearch = () => {
    switch (typeFilter) {
      case "Characters":
        return <Characters />;
      case "Locations":
        return <Locations />;
      case "Episodes":
        return <Episodes />;

      default:
        return <div>Choose a filter to start</div>;
    }
  };

  return (
    <Container fluid>
      <Row className="header">
        <p className="p-2">WEB CHALLENGE REACT OF RICK & MORTY</p>
      </Row>
      <Row className="m-3">
        <Col md={3}>
          <Filters onCheck={handleCheck} />
        </Col>
        <Col md={6}>{showSearch()}</Col>
      </Row>
    </Container>
  );
};

export default Home;
