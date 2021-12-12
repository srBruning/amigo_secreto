import React, { Component, useEffect } from "react";

import { Container } from "react-bootstrap";
import Api from "../Api";
import { useHistory } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css"; 

class PreloadClass extends Component {
  render() {
    return (
      <div className="preload">
        <Container>
          <Dots />
        </Container>
      </div>
    );
  }
}

const Prealod = () => {
  const validaToken = async () => {
    const token = await Api.currentToken();
    if (token) {
      const json = await Api.checkToken(token);

      if (!json.token) {
        await Api.removeToken();
        return false;
      }
      // salva o token
      await Api.guardaToken(json.token);
      return true;
    }
    return false;
  };

  const history = useHistory();

  useEffect(() => {
    const checkToken = async () => {
      if (await validaToken()) {
        // goto home
        history.push("/Home");
      } else {
        history.push("/SignIn");
      }
    };
    checkToken();
  }, []);
  return <PreloadClass></PreloadClass>;
};

export default Prealod;
