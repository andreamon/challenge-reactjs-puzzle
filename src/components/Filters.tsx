import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

const Filters = (props) => {
  const types = ["Characters", "Locations", "Episodes"];

  return (
    <Container>
      <Row className="p-3" style={{ fontWeight: "bold" }}>
        Filters
      </Row>
      <Form.Group as={Row}>
        <Col sm={10}>
          {types.map((value, index) => {
            return (
              <Form.Check
                key={index}
                type="radio"
                value={`${value}`}
                label={`${value}`}
                name="selectedFilter"
                id={`${value}`}
                onChange={() => {
                  props.onCheck(value);
                }}
              />
            );
          })}
        </Col>
      </Form.Group>
    </Container>
  );
};
export default Filters;
