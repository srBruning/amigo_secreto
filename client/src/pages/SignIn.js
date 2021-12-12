import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../Api";
import { validaUserResponse } from "../dao/UserDao";
import { withRouter } from "react-router-dom";

import NavBar from "../componentes/login/NaveBar";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Form
} from "react-bootstrap";

class SingInClass extends Component {
  constructor() {
    super();
    this.state = { usernameField: "", passwordField: "" };

    this.handleSingClike = this.handleSingClike.bind(this);
  }

  setUsername(usernameField) {
    this.setState({ usernameField });
  }

  setPassword(passwordField) {
    this.setState({ passwordField });
  }

  async handleSingClike(event) {
    event.stopPropagation();
    if (this.state.usernameField !== "" && this.state.passwordField !== "") {
      const json = await Api.signIn(
        this.state.usernameField,
        this.state.passwordField
      );
      if ((await validaUserResponse(json)).indValido) {
        // Goto home
        const { history } = this.props;
        if (history) history.push("/Home");
      } else {
        alert("E-mail e/ou senha invalidos\n[" + json.message + "]");
      }
    } else {
      alert("Informe email e senha!");
    }
  }

  handleChangeField(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    if (fieldName === "email") this.setUsername(fleldVal);
    else if (fieldName === "password") this.setPassword(fleldVal);
  }

  render() {
    this.history = this.props.history;
    return (
      <>
        <NavBar notAut={true}></NavBar>
        <Container>
          <div className="container-box title">
            <h3 className="switch to-sign-in tagline">Login</h3>
            <br />
          </div>
          <Form onSubmit={this.handleSingClike}>
            <InputGroup
              className="mb-3"
              value={this.state.usernameField}
              onChange={(t) => this.handleChangeField(t)}
            >
              <FormControl
                placeholder="Nome de Usuário"
                aria-label="Nome de Usuário"
                aria-describedby="basic-addon1"
                name="email"
              />
            </InputGroup>
            <InputGroup
              className="mb-3"
              value={this.state.passwordField}
              onChange={(t) => this.handleChangeField(t)}
            >
              <FormControl
                placeholder="Digite sua senha"
                aria-label="Digite sua senha"
                aria-describedby="basic-addon1"
                name="password"
                type="password"
              />
            </InputGroup>

            <div>
              <Row>
                <Button variant="primary" onClick={this.handleSingClike}>
                  Login
                </Button>
              </Row>
              <div
                className="login-or"
                style={{
                  position: "relative",
                  fontSize: "18px",
                  color: "#aaa",
                  marginTop: "10px",
                  marginBottom: "10px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <hr
                  className="hr-or"
                  style={{
                    backgroundColor: "#cdcdcd",
                    height: "1px",
                    marginTop: "0px",
                    marginBottom: "0px",
                  }}
                />
              </div>
              <Row>
                <Link to="/SignUp">
                  <Button variant="secondary">Registre-se</Button>
                </Link>
              </Row>
            </div>
          </Form>
        </Container>
      </>
    );
  }
}

export default withRouter(SingInClass);
