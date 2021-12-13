import React from "react";
import Api from "../Api";
import cookie from "react-cookies";

export const validaUserResponse = async (json) => {
  console.log(json);
  console.log(json.token);
  if (!json.token) {
    json.indValido = false;
    return json;
  }
  // salva o token
  await Api.guardaToken(json.token);
  console.log("#.4");
  const token = await Api.currentToken();

  json.indValido = true;
  return json;
};

export const validaToken = async (userDispatch) => {
  const token = await Api.currentToken();
  if (token) {
    const json = await Api.checkToken(token);
    return await validaUserResponse(json, userDispatch);
  }
  return false;
};

export const validarSingUpData = (nome, email, senha) => {
  if (nome == "") return "Inform seu nome";

  if (email == "") return "Inform seu e-mail";

  if (senha == "") return "Inform uma senha valida";

  return false;
};


export const guardaChaveGrupo = async (token) => {
  await cookie.save("keyGrupo", token, { path: "/" });
  await localStorage.setItem("keyGrupo", token);
};

export const removeChaveGrupo = async () => {
  await cookie.remove("keyGrupo", { path: "/" });
  await localStorage.removeItem("keyGrupo");
};

export const getChaveGrupo = async () => {
  let token = await cookie.load("keyGrupo");
  if (token && token != null && token != "null") return token;
  
  token = await localStorage.getItem("keyGrupo");
  await cookie.save("keyGrupo", token, { path: "/" });
  return token;
};

