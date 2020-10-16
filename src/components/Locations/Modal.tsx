import React from "react";
import { Modal, Image } from "react-bootstrap";

const Detail = (props) => {
  return (
    <Modal show={props.handleShow} onHide={props.handleClose}>
      <Modal.Header closeButton />
      <Modal.Body className="text-center">
        <h4>
          <strong>{props.location.name}</strong>
        </h4>

        <div style={{ textAlign: "start", margin: "2rem 3rem" }}>
          <p>
            <strong>Type: </strong> {props.location.type}
          </p>
          <p>
            <strong>Dimension: </strong> {props.location.dimension}
          </p>
        </div>
        <h5 style={{ textAlign: "start", fontWeight: "bold" }}>Residents</h5>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {props.residents.length > 0 ? (
            props.residents.slice(0, 5).map((res, index) => (
              res.resname !== null ? (
                <div key={index} style={{ margin: "5px" }}>
                <Image src={res.resimage} width="100px" rounded />
                <p style={{fontSize:"12px"}}>{res.resname}</p>
                </div>
                ) : (
                <p key={index} style={{ fontWeight: "bold" }}>Residents aren't exist at this location</p>
                )
            ))
          ) : (
            <p style={{ fontWeight: "bold" }}>Residents aren't exist at this location</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;
