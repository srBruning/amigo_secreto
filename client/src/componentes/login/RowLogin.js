import React from "react";

import { Image, Row } from "react-bootstrap";

const RowLogin = (props) => {
  return (
    <Row className="row py-5 mt-4 align-items-center">
      <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
        <Image
          src="/assets/demo.svg"
          fluid
          alt=""
          className="img-fluid mb-3 d-none d-md-block"
        />
        <h1>4BR: Encurtar likes e gerar QR Code</h1>
        <p className="font-italic text-muted mb-0">...</p>
      </div>
      {/* Registeration Form */}
      <div className="col-md-7 col-lg-6 ml-auto">{props.children}</div>
    </Row>
  );
};

export default RowLogin;
