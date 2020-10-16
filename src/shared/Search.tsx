import React from "react";

import { Button, Form, FormControl } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const Search = (props) => {

  const clearSearch = (e) => {
    e.target.reset();
    e.preventDefault();
    props.onChange("");
  };

  return (
    <Form onSubmit={clearSearch}>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="search"
          aria-describedby="search"
          onChange={(e)=>{props.onChange(e.target.value)}}
        />
        <InputGroup.Append>
          <Button variant="primary" type="submit">
            Clear all
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default Search;