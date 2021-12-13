import React, { useState, useEffect } from "react";
import NavBar from "../componentes/login/NaveBar";
import Api from "../Api";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

import { useHistory, Link } from "react-router-dom";
import Authentication from "../componentes/Authentication";

const Home = () => {
  const history = useHistory();

  const [grupo_id, setgrupo_id] = useState("");
  const [grupos, setgrupos] = useState([]);
  const [fieldValidation, setFieldValidation] = useState({ slug: true });

  const buscarGrupos = async () => {
    const token = await Api.currentToken();
    if (token) {
      const lstGrupos = await Api.buscarGrupos(token);
      
      setgrupos(lstGrupos);
      return true;
    }
    return false;
  };

  const entrarGrupo = async (event) => {
    if (grupo_id === "") {
      return;
    }

    const ret = await Api.entrarGrupo(grupo_id);
    console.log(ret);
    if (ret.message) alert(ret.message);
    if (ret.fields_errors) {
      alert(ret.fields_errors[0].message);
    }
    buscarGrupos();
  };

  useEffect(() => {
    buscarGrupos();
  }, []);

  const handleChangeField = (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    if (fieldName == "grupo_id") {
      setgrupo_id(fleldVal);
    }
  };

  const montaGrupoItem = (item) => {
    return (
      <Col className="col-12 col-sm-6 col-md-6 col-lg-4">
        <Card
          key={item.id}
          className="card  shadow p-3 mb-5 bg-white rounded"
          onClick={() => {
            history.push({
              pathname: "/GrupoInfo",
              search: "?grupo=" + item.grupo.chave,
              state: { grupo: item.grupo },
            });
            //navigation.navigate("GrupoInfo", item.grupo);
          }}
        >
          <img className="card-img-top" src="/grup.png" alt="Avatar"></img>
          <div className="card-body">
            <h5 className="card-title">{item.grupo.name}</h5>
            {item.chave}
          </div>
          <div className="card-body"></div>
          <div className="card-body">
            <Button
              className="card-link"
              onClick={() => {
                navigator.clipboard.writeText(item.grupo.chave);
              }}
            >
              <b>Chave:</b> {item.grupo.chave}
            </Button>
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <Authentication>
      <NavBar></NavBar>
      <Container>
        <section className="shadow p-3 mb-5 bg-white rounded">
          <h2 className="title mb-0">Entrar em um grupo:</h2>
          <form>
            <Row>
              <Col sm="6">
                <InputGroup className="mb-3" value={grupo_id}>
                  <FormControl
                    placeholder="chave do grupo"
                    value={grupo_id}
                    onChange={(t) => handleChangeField(t)}
                    aria-label="Grupo"
                    aria-describedby="basic-addon1"
                    name="grupo_id"
                  />
                </InputGroup>
              </Col>
              <Col sm="4">
                <Button variant="primary" onClick={entrarGrupo}>
                  Entrar no grupo
                </Button>{" "}
              </Col>
            </Row>
          </form>
        </section>

        <div className="shadow-none p-3 mb-5 bg-white rounded">
          <h2 className="title mb-0"> Meus Grupos:</h2>
          <Row>
            {grupos &&
              grupos.map((item) => {
                return montaGrupoItem(item);
              })}
          </Row>
        </div>
      </Container>
    </Authentication>
  );
};

export default Home;
