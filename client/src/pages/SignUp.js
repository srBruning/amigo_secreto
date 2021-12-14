import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import NavBar from "../componentes/login/NaveBar";
import { useRollbar } from "@rollbar/react";

import Api from "../Api";
import { getChaveGrupo, removeChaveGrupo } from "../dao/UserDao";
class SignUpClass extends Component {
  constructor() {
    super();

    this.state = {
      nomeField: "",
      emailField: "",
      passwordField: "",
      rePasswordField: "",
      validated: false,
      grupo: null,
    };
    getChaveGrupo
      .bind(this)()
      .then((key) => {
        this.state.grupo = key;
      });

    this.handleSingUpClike = this.handleSingUpClike.bind(this);
  }

  validarForm(event) {
    if (event) {
      this.setState({ validated: true });
      const form = event.currentTarget;
      console.log(form);
      event.preventDefault();
      event.stopPropagation();
      if (!form.checkValidity()) {
        return false;
      }
    }
    if (this.state.passwordField !== this.state.rePasswordField) {
      alert("Senhas não confere!");
      return false;
    }
    return true;
  }

  tratarErroResponse(json) {
    if (json.message) {
      alert(json.message);
    } else if (json.fields_errors && json.fields_errors.length > 0) {
      if (json.fields_errors[0].path === "user_name") {
        alert("E-mail inválido");
        return;
      }
    }
    // Armazena erros não tratados no RollBar
    this.props.rollbar.log(
      "[post/user] unexpected error: " + JSON.stringify(json)
    );
    alert("Erro inesperado");
  }

  /**
   * Mostrar menssagem de sucesso e navaga para /Home
   */
  sucesso() {
    alert("Cadastrado com sucesso!");
    // Goto home
    const { history } = this.props;
    if (history) history.push("/Perfil");
  }

  tratarSucesso(json) {
    // Verifica se tem uma chave de grupo armazenado
    // então inclui usuario no grupo
    getChaveGrupo().then((key) => {
      if (!key || key === "") {
        this.sucesso();
      } else {
        removeChaveGrupo();
        Api.entrarGrupo(key).then(() => {
          this.sucesso();
        });
      }
    });
  }

  handleSingUpClike(event) {
    if (!this.validarForm(event)) return;

    Api.signUp(
      this.state.nomeField,
      this.state.emailField,
      this.state.passwordField
    ).then((json) => {
      if (json.indValido) {
        this.tratarSucesso(json);
      } else {
        event.preventDefault();
        this.tratarErroResponse(json);
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

            <input type="hidden" id="grupo_key" name="grupo_key" value={this.state.grupo} />

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

export const withHooks = (Component) => {
  return (props) => {
    const rollbar = useRollbar(); // <-- must have parent Provider
    const history = useHistory();
    return <Component rollbar={rollbar} history={history} {...props} />;
  };
};

export default withHooks(SignUpClass);
