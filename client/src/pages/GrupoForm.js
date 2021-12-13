import React, { useState, useContext, useEffect } from "react";
import Api from "../Api";
import NavBar from "../componentes/login/NaveBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container, 
  Button, Form
} from "react-bootstrap";

import { useHistory, Link } from "react-router-dom";
import Authentication from "../componentes/Authentication";

const GrupoForm = () => {
  const history = useHistory();
  const [nameField, setNameField] = useState("");

  const handleChangeField = (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    if (fieldName === "name") {
      setNameField(fleldVal);
    }
  };

  
  const handleCreatGrupClike = async (event) => {
    try {
      const token = await Api.currentToken();
      const json = await Api.criarGrupo(token, { name: nameField });
      if (json.id === undefined) {
        console.log(json);
        alert("Ret: " + json.message);
        return;
      }
    } catch (e) {
      console.log(e);
      alert("Error: " + JSON.stringify(e));
      return;
    }
    history.push("/Home");
  };

  return (
    <Authentication>
     <NavBar></NavBar>
      <Container>
        <section className="url-shortener">
          <h2 className="title mb-0">Criar grupo:</h2>
          <div>
            <Form.Group
              className="mb-3"
              value={nameField}
              onChange={(t) => handleChangeField(t)}
            >
              <Form.Control
                placeholder="Nome Grupo"
                aria-label="Nome Grupo"
                aria-describedby="basic-addon1"
                name="name"
                required
              />
            </Form.Group>

            <div className="BtnArea">
              {/* Submit Button  */}
              <Button
                type="submit"
                variant="primary"
                disabled={nameField == null || nameField === ""}
                onClick={(e) => {
                  handleCreatGrupClike(e);
                }}
              >
                Criar Grupo
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </Authentication>
  );
};

export default GrupoForm;
