import React, { useState, useEffect } from "react";
import Api from "../Api";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import FileUpload from "../componentes/FileUpload";
import Autentication from "../componentes/Autentication";
import { Dots } from "react-activity";
import "./Perfil.css";
import NavBar from "../componentes/login/NaveBar";

const Perfil = () => {
  const [perfil, setPerfil] = useState("");
  const [indPassword, setIndPassword] = useState("");
  const [inUpload, setInUpload] = useState(false);

  const buscarPerfil = async () => {
    const _perfil = await Api.buscarPerfil();
    setPerfil(_perfil);
  };

  const onUpload = (p) => {
    setInUpload(p);
  };

  useEffect(() => {
    buscarPerfil();
  }, []);

  const handleChangeField = (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    const obj = {};
    obj[fieldName] = fleldVal;

    setPerfil({ ...perfil, ...obj });
  };

  const handleSaveClike = (e) => {
    
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();

    const send = Object.fromEntries(
      Object.entries(perfil).filter(([_, v]) => v != null)
    );
    
    if (
      indPassword &&
      (send.password == null || send.password !== send.rePassword)
    ) {
      alert("Senhas não confere!");
      return;
    }
    

    Api.atualizarUsuario(send).then((json) => {
      
      if (json.error) {
        alert("Erro: " + json.error);
        return;
      }
      return buscarPerfil();
    });
  };

  return (
    <Autentication>
      <NavBar></NavBar>
      <Container>
        <Row>
          <Col className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 image-upload">
              {inUpload || !perfil ? (
                <Dots />
              ) : (
                <FileUpload
                  className="FileUpload"
                  callback={buscarPerfil}
                  autoUpload={true}
                  uploadListner={onUpload}
                >
                  <div>
                    <img
                      className="rounded-circle mt-5 pointer"
                      width="150px"
                      alt="Avatar"
                      src={
                        perfil.picture_avatar
                          ? perfil.picture_avatar.url
                          : "/avatar.jpg"
                      }
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                  </div>
                </FileUpload>
              )}
              <span className="font-weight-bold">{perfil.user_name}</span>
              <span className="text-black-50">{perfil.name}</span>
              <span> </span>
            </div>
          </Col>
        </Row>
        {/* Formulario de edição  */}
        {inUpload || !perfil ? (
          <Dots />
        ) : (
          <Form noValidate onSubmit={handleSaveClike}>
            <Form.Group className="mb-3" onChange={(t) => handleChangeField(t)}>
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                defaultValue={perfil.name}
                placeholder="Nome Completo"
                aria-label="Nome Completo"
                aria-describedby="basic-addon1"
                name="name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" onChange={(t) => handleChangeField(t)}>
              <Form.Label>Nome de usuário ou link para o facebook</Form.Label>
              <Form.Control
                defaultValue={perfil.facebook}
                placeholder="user.name ou https://www.facebook.com//user.name"
                aria-label="Link para o facebook"
                aria-describedby="basic-addon1"
                name="facebook"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" onChange={(t) => handleChangeField(t)}>
              <Form.Label>Nome de usuário ou link para o instagram</Form.Label>
              <Form.Control
                defaultValue={perfil.instagram}
                placeholder="user.name ou https://instagram.com/user.name"
                aria-label="Link para o instagram"
                aria-describedby="basic-addon1"
                name="instagram"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" onChange={(t) => handleChangeField(t)}>
              <Form.Label>Numero do whatsapp</Form.Label>
              <Form.Control
                defaultValue={perfil.whatsapp}
                placeholder="54992863393"
                aria-label="Numero do whatsapp"
                aria-describedby="basic-addon1"
                name="whatsapp"
                required
              />
            </Form.Group>

            <div className="shadow-none p-3 mb-5 bg-white rounded  ">
              <Form.Group
                onChange={(t) => setIndPassword(!indPassword)}
                className="mb-3"
                controlId="formBasicCheckbox"
              >
                <Form.Check type="checkbox" label="Alterar Senha" />
              </Form.Group>
              {/* Senhas */}
              {indPassword && (
                <div className="shadow-none  ">
                  <Form.Group
                    className="mb-3"
                    onChange={(t) => handleChangeField(t)}
                    method="post"
                  >
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      defaultValue={perfil.password}
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
                    onChange={(t) => handleChangeField(t)}
                  >
                    <Form.Label>Repita a Senha</Form.Label>
                    <Form.Control
                      defaultValue={perfil.rePassword}
                      placeholder="Confirmar Senha"
                      aria-label="Confirmar Senha"
                      aria-describedby="basic-addon1"
                      name="rePassword"
                      type="password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {"As senhas não são iguais. Tente novamente."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              )}
            </div>
            <div className="shadow-none p-3 mb-5 bg-white rounded d-flex justify-content-center">
              <Row>
                {/* Submit Button  */}
                <Col sm="6" xs="12">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={
                      indPassword &&
                      (perfil.password == null ||
                        perfil.password === "" ||
                        perfil.password !== perfil.rePassword)
                    }
                  >
                    Salvar
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Container>
    </Autentication>
  );
};

export default Perfil;
