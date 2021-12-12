import React from "react";
import "./NaveBar.css";
import {
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Container, Image, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Api from "../../Api";

const MNavBar = (props, bg) => {
  let history = useHistory();
  const tBtn = 8;
  const onSingOut = () => {
    Api.removeToken().then(() => {
      history.replace("/SignIn");
    });
  };

  return (
    <Navbar bg="light" expand="lg" className="app_menu">
      <Container fluid>
        <Navbar.Brand href="#">
          <a href="/" className="navbar-brand">
            <Image src="/logo100.png" alt="logo" width="45" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link className={"button-" + tBtn} href="/">
              Meus Grupos
            </Nav.Link>
            <Nav.Link className={"button-" + tBtn} href="/Perfil">
              Perfil
            </Nav.Link>
            <Nav.Link className={"button-" + tBtn} href="/GrupForm">
              Novo Grupo
            </Nav.Link>
          </Nav>
          <div className="d-flex">
            <Link to="/SignIn" className="mr-sm-2">
              <Button
                className="mr-sm-2"
                variant="outline-success"
                onClick={onSingOut}
              >
                Sair
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MNavBar;

// <header className="header">
//         <Container>
//           <Row>
//             <Col sm="6" md="2" lg="2" xs="12">
//               {/* Navbar Brand */}
//               <a href="/" className="navbar-brand">
//                 <Image src="/logo100.png" alt="logo" width="45" />
//               </a>
//             </Col>

//             <Col sm="6" md="2" lg="2" xs="12">
//               <Link className={"button-" + tBtn} to="/">
//                 Inicio
//               </Link>
//             </Col>
//             <Col sm="6" md="2" lg="2" xs="12">
//               <Link className={"button-" + tBtn} to="/GrupForm">
//                 Criar Grupo
//               </Link>
//             </Col>
//             <Col sm="6" md="2" lg="2" xs="12">
//               <Link className={"button-" + tBtn} to="/Perfil">
//                 Perfil
//               </Link>
//             </Col>
//             <Col sm="6" md="2" lg="2" xs="12">

//             </Col>
//           </Row>
//         </Container>
