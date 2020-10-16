import React from "react";
import { Modal, Image } from "react-bootstrap";

const Detail = (props) => {
  return (
    <Modal show={props.handleShow} onHide={props.handleClose}>
      <Modal.Header closeButton />
      <Modal.Body className="text-center">
        <h4>
          <strong>{props.episode.name}</strong>
        </h4>

        <div style={{ textAlign: "start", margin: "2rem 3rem" }}>
          <p>
            <strong>Episode: </strong> {props.episode.episode}
          </p>
          <p>
            <strong>Air Date: </strong> {props.episode.air_date}
          </p>
        </div>
        <h5 style={{ textAlign: "start", fontWeight: "bold" }}>Characters</h5>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {props.characters.length > 0 ? (
            props.characters.slice(0, 5).map((char, index) => (
              char.charname !== null ? (
                <div key={index} style={{ margin: "5px" }}>
                <Image src={char.charimage} width="100px" rounded />
                <p style={{fontSize:"12px"}}>{char.charname}</p>
                </div>
                ) : (
                <p key={index} style={{ fontWeight: "bold" }}>There aren't characters</p>
                )
            ))
          ) : (
            <p style={{ fontWeight: "bold" }}>There aren't characters</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;