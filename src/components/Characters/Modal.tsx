import React from "react";
import { Modal, Image } from "react-bootstrap";

const Detail = (props) => {
  return (
    <Modal show={props.handleShow} onHide={props.handleClose}>
      <Modal.Header closeButton/>
      <Modal.Body className="text-center">
        <Image src={props.character.image} width="300px" rounded />
        <div style={{ textAlign: "start", margin: "2rem 3rem" }}>
          <p>
            <strong>Name: </strong> {props.character.name}
          </p>
          <p>
            <strong>Type: </strong> {props.character.type ? props.character.type : 'without specifying'}
          </p>
          <p>
            <strong>Gender: </strong> {props.character.gender}
          </p>
          <p>
            <strong>Specie: </strong> {props.character.species}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;
