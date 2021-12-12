import React, { useEffect } from "react";
import Api from "../Api";
import { useHistory } from "react-router-dom";


export default function Autentication(props) {
  const history = useHistory();

  const validaToken = async () => {
    const token = await Api.currentToken();
    if (token) {
      const json = await Api.checkToken(token);

      if (!json.token) {
        await Api.removeToken();
        return false;
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!(await validaToken())) {
        history.push("/SignIn");
      }
    };
    checkToken();
  }, []);

  return <>{props.children}</>;
}
