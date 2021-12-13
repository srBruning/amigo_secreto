import React, { useState, useContext, useEffect } from "react";
import Api from "../Api";
import NavBar from "../componentes/login/NaveBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Authentication from "../componentes/Authentication";
import { Container, Col, Row, Button, Card, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { useHistory } from "react-router-dom";
import "../componentes/Buttons.css";
import MemberGrupItem from "../componentes/MemberGrupItem";
const GrupoInfo = () => {
  const location = useLocation();
  const history = useHistory();

  const { id } =
    location.state && location.state.grupo ? location.state.grupo : {};

  const [userGrup, setUserGrup] = useState({});
  const [grupo, setGrup] = useState({});
  const [membros, setMembros] = useState([]);
  const [friend, setfFiend] = useState({});
  const [revelar, setRevelar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buscarGrupo = async () => {
    setShow(false);

    const g = await Api.buscarGrupo(id);
    if (!g || !g.grupo) return;

    console.log(JSON.stringify(g));
    setUserGrup(g);
    setGrup(g.grupo);
    setMembros(g.grupo.membros);
    console.log(JSON.stringify(g.grupo.membros));

    if (g.friend && Object.keys(g.friend).length === 0) {
      setfFiend(g.friend);
    } else setfFiend(null);

    return true;
  };

  const sortearAmigos = async (event) => {
    if (!userGrup || !userGrup.is_dono) {
      return;
    }

    const ret = await Api.sortear(userGrup.grupo_id);
    console.log("#3");
    console.log(JSON.stringify(ret));
    history.push("/Home");
  };

  useEffect(() => {
    if (id) buscarGrupo();
  }, []);

  const getBtnMostrarAmigo = () => {
    return (
      <Button
        onClick={() => {
          setRevelar(!revelar);
        }}
      >
        {revelar ? "Ocultar" : "Mostrar meu amigo secreto"}
      </Button>
    );
  };
  const amigoOculto = () => {
    return (
      <Card className="card col-12 col-sm-6 col-md-6 col-lg-4 card ">
        <img className="card-img-top" src="/oculto.png" alt="Avatar" />
        <div className="card-body">
          <h5>Amigo Oculto</h5>
        </div>
        {getBtnMostrarAmigo()}
      </Card>
    );
  };

  return (
    <Authentication>
      <NavBar></NavBar>
      <Container>
        <section className="url-shortener">
          <div className="shadow p-3 mb-5 bg-white rounded">
            <h2 className="title mb-0">Grupo: {grupo.name}</h2>
          </div>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <label className="d-flex justify-content-between">
              <h3 className="title mb-0">Chave :{grupo.chave}</h3>
              <Button
                variant="secondary"
                className="card-link"
                onClick={() => {
                  navigator.clipboard.writeText(grupo.chave);
                }}
              >
                Copy
              </Button>
            </label>
          </div>

          {userGrup && userGrup.is_dono && (
            <div className="shadow-none p-3 mb-5 bg-white rounded d-flex justify-content-center">
              <Button
                variant="primary"
                onClick={handleShow}
                className={
                  "btnSortear " + (grupo.drawn_at ? "button-1" : "button-63")
                }
              >
                {grupo.drawn_at ? "Novo sorteio!" : "Sortear!"}
              </Button>{" "}
            </div>
          )}

          {/* Amigo oculto */}
          {friend && Object.keys(friend).length > 0 && (
            <div className="shadow-none p-3 mb-5 bg-white rounded">
              <Row>
                {revelar ? (
                  <MemberGrupItem item={friend}>
                    {getBtnMostrarAmigo()}
                  </MemberGrupItem>
                ) : (
                  amigoOculto()
                )}
              </Row>
            </div>
          )}
        </section>
        <div className="shadow-none p-3 mb-5 bg-white rounded">
          <h2 className="title mb-0">Membros:</h2>

          <Row gutter={40}>
            {membros &&
              membros.map((item) => {
                return <MemberGrupItem item={item.user}></MemberGrupItem>;
              })}
          </Row>
        </div>
      </Container>

      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar sorteio?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Após o sorteio, só poderão entrar novos usuários se o sorteio for
          refeito. Continuar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cacelar
          </Button>
          <Button variant="primary" onClick={sortearAmigos}>
            Sortear
          </Button>
        </Modal.Footer>
      </Modal>
    </Authentication>
  );
};

export default GrupoInfo;
