import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import NavBar from "../componentes/login/NaveBar";

import Api from "../Api";
import { validaUserResponse } from "../dao/UserDao";

class SignUpClass extends Component {
  constructor() {
    super();
    this.state = {
      nomeField: "",
      emailField: "",
      passwordField: "",
      rePasswordField: "",
      validated: false,
    };

    this.handleSingUpClike = this.handleSingUpClike.bind(this);
  }

  handleSingUpClike(event) {
    if (event) {
      this.setState({ validated: true });
      const form = event.currentTarget;
      console.log(form);
      event.preventDefault();
      event.stopPropagation();
      if (!form.checkValidity()) {
        return;
      }
    }
    if (this.state.passwordField !== this.state.rePasswordField) {
      alert("Senhas não confere!");
      return;
    }

    Api.signUp(
      this.state.nomeField,
      this.state.emailField,
      this.state.passwordField
    )
      .then((json) => {
        return validaUserResponse(json);
      })
      .then((json) => {
        if (json.indValido) {
          alert("cadastrado com sucesso!");
          // Goto home
          const { history } = this.props;
          if (history) history.push("/Perfil");
        } else {
          event.preventDefault();
          alert(json.message);
        }
      });
  }

  handleChangeField(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    if (fieldName === "email") this.setState({ emailField: fleldVal });
    else if (fieldName === "password")
      this.setState({ passwordField: fleldVal });
    else if (fieldName === "fullname") this.setState({ nomeField: fleldVal });
    else if (fieldName === "repassword") {
      this.setState({ rePasswordField: fleldVal });
    }
  }

  render() {
    return (
      <>
        <NavBar notAut={true}></NavBar>
        <Container>
          <div className="container-box title">
            <h3 className="switch to-sign-in tagline">
              Inscreva-se e comece a encurtar
            </h3>
            <br />
          </div>

          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSingUpClike}
          >
            <Form.Group
              className="mb-3"
              value={this.state.nomeField}
              onChange={(t) => this.handleChangeField(t)}
            >
              <Form.Control
                placeholder="Nome Completo"
                aria-label="Nome Completo"
                aria-describedby="basic-addon1"
                name="fullname"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={this.state.emailField}
              onChange={(t) => this.handleChangeField(t)}
            >
              <Form.Control
                placeholder="E-mail"
                aria-label="E-mail"
                aria-describedby="basic-addon1"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={this.state.passwordField}
              onChange={(t) => this.handleChangeField(t)}
              method="post"
            >
              <Form.Control
                placeholder="Senha"
                aria-label="Senha"
                aria-describedby="basic-addon1"
                name="password"
                type="password"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={this.state.rePasswordField}
              onChange={(t) => this.handleChangeField(t)}
            >
              <Form.Control
                placeholder="Confirmar Senha"
                aria-label="Confirmar Senha"
                aria-describedby="basic-addon1"
                name="repassword"
                type="password"
                required
              />
              <Form.Control.Feedback type="invalid">
                {"As senhas não são iguais. Tente novamente."}
              </Form.Control.Feedback>
            </Form.Group>

            <div>
              {/* Submit Button  */}
              <Button
                type="submit"
                variant="primary"
                disabled={
                  this.state.passwordField == null ||
                  this.state.passwordField === "" ||
                  this.state.passwordField !== this.state.rePasswordField
                }
              >
                Registre-se
              </Button>
              {/* Divider Text */}
              <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                <div className="border-bottom w-100 ml-5"></div>
                <span className="px-2 small text-muted font-weight-bold text-muted">
                  ou
                </span>
                <div className="border-bottom w-100 mr-5"></div>
              </div>
              <Link to="/SignIn">
                <Button variant="secondary">Login</Button>
              </Link>
            </div>
          </Form>
        </Container>
      </>
    );
  }
}

export default withRouter(SignUpClass);
