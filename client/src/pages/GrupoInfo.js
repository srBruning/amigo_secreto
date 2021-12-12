import React, { useState, useContext, useEffect } from "react";
import Api from "../Api";
import NavBar from "../componentes/login/NaveBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Autentication from "../componentes/Autentication";
import { Container, Row, Button, Card, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { useHistory, Link } from "react-router-dom";
import "../componentes/Buttons.css";
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

  const buscarGrupo = async () => {
    const g = await Api.buscarGrupo(id);
    if (!g || !g.grupo) return;
    console.log(JSON.stringify(g));
    setUserGrup(g);
    setGrup(g.grupo);
    setMembros(g.grupo.membros);
    console.log(JSON.stringify(g.grupo.membros))
    if (g.friend) {
      setfFiend(g.friend);
    }
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
  const montaSocialLik = (path, user) => {
    console.log("___"+user);
    if (!user) return user;
console.log("___"+user);
    var pattern =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(user)) {
      return user;
    }

    return path + user;
  };
  return (
    <Autentication>
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
                onClick={sortearAmigos}
                className={
                  "btnSortear " + (grupo.drawn_at ? "button-1" : "button-63")
                }
              >
                {grupo.drawn_at ? "Novo sorteio!" : "Sortear!"}
              </Button>{" "}
            </div>
          )}

          <Row>
            {userGrup.friend && (
              <Card className="card col-12 col-sm-6 col-md-6 col-lg-4 ">
                <img
                  className="card-img-top"
                  src={
                    revelar
                      ? ( userGrup.friend.picture_avatar
                        ? userGrup.friend.picture_avatar.url
                        : "/avatar.jpg")
                      : "/oculto.png"
                  }
                  alt="Avatar"
                />
                {revelar ? (
                  <div className="card-body">
                    <h5 className="card-title">Amigo</h5>
                    {userGrup.friend.name}
                    <h5 className="card-title">{userGrup.friend.email}</h5>
                    <h5 className="card-title">{userGrup.friend.telefone}</h5>
                    {userGrup.friend.facebook && (
                      <SocialIcon url={montaSocialLik("https://www.facebook.com/", userGrup.friend.facebook)} />
                    )}
                    {userGrup.friend.instagram && (
                      <SocialIcon url={montaSocialLik("http://instagram.com/", userGrup.friend.instagram)} />
                    )}
                    {userGrup.friend.whatsapp && (
                      <SocialIcon url={montaSocialLik("https://api.whatsapp.com/send?phone=", userGrup.friend.whatsapp)} />
                    )}
                    <div className="card-body">
                      <Button
                        onClick={() => {
                          setRevelar(!revelar);
                        }}
                      >
                        Ocultar meu amigo secreto
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="card-body">
                    <Button
                      onClick={() => {
                        setRevelar(!revelar);
                      }}
                    >
                      Mostrar meu amigo secreto
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </Row>
        </section>
        <div className="shadow-none p-3 mb-5 bg-white rounded">
          <h2 className="title mb-0">Membros:</h2>
        </div>
        <Row>
          {membros &&
            membros.map((item) => {
              let url = item.user.picture_avatar
                ? item.user.picture_avatar.url
                : "/avatar.jpg";
              return (
                <Card
                  key={item.id}
                  className="card col-6 col-sm-6 col-md-6 col-lg-4"
                >
                  <img className="card-img-top" src={url} alt="Avatar"></img>
                  <div className="card-body">
                    <h5 className="card-title">{item.user.name}</h5>
                    <h5 className="card-title">{item.user.email}</h5>
                    <h5 className="card-title">{item.user.telefone}</h5> 
                    { item.user.facebook && (
                      <SocialIcon url={montaSocialLik("https://www.facebook.com/", item.user.facebook)} target="_blank"/>
                    )}
                    {item.user.instagram && (
                      <SocialIcon url={montaSocialLik("https://instagram.com/", item.user.instagram)} target="_blank"/>
                    )}
                    {item.user.whatsapp && (
                      <SocialIcon url={montaSocialLik("https://api.whatsapp.com/send?phone=", item.user.whatsapp)} target="_blank"/>
                    )}
                  </div>
                </Card>
              );
            })}
        </Row>
      </Container>
    </Autentication>
  );
};

export default GrupoInfo;
