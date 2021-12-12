import cookie from "react-cookies";
import axios from "axios";

// const BASE_API ="http://localhost:3737";
// const BASE_API = "http://207.154.237.32:3636";
const BASE_API = "https://dibr.cc";

const _currentToken = async () => {
  let token = await cookie.load("token");
  if (token && token != null && token != "null") return token;
  await _removeToken();
  token = await localStorage.getItem("token");
  await cookie.save("token", token, { path: "/" });
  return token;
};

const _guardaToken = async (token) => {
  await cookie.save("token", token, { path: "/" });
  await localStorage.setItem("token", token);
};
const _removeToken = async () => {
  await cookie.remove("token", { path: "/" });
  await localStorage.removeItem("token");
};

const doPost = async (body, path, token) => {
  const reqParam = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(body),
  };
  console.log(`${BASE_API}${path}`);
  console.log(reqParam);
  console.log(`***${BASE_API}${path}****`);
  const resp = await fetch(`${BASE_API}${path}`, reqParam);

  console.log("Response: ", resp);
  if (resp.json) {
    console.log("status: " + resp.status);
    const json = await resp.json();
    return json;
  }

  return resp;
};

const doGet = async (path, token) => {
  const reqParam = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const resp = await fetch(`${BASE_API}${path}`, reqParam);
  if (resp.json) {
    const json = await resp.json();
    console.log("status: " + resp.status);
    return json;
  }
  return resp;
};

// On file upload (click the upload button)
const uploadAvatar = (selectedFile) => {
  // Create an object of formData
  const formData = new FormData();

  // Update the formData object
  formData.append("file", selectedFile, selectedFile.name);

  // Details of the uploaded file
  console.log(selectedFile);

  // Request made to the backend api
  // Send formData object
  //axios.post(`${BASE_API}/api/user/avatar/`, formData);
  return Api.currentToken().then((token) => {
    return axios({
      method: "post",
      url: `${BASE_API}/api/user/avatar/`,
      data: formData,
      headers: { "Content-Type": "application/json", "x-access-token": token },
    });
  });
};

const Api = {
  BASE_API,
  checkToken: async (token) => {
    return await doGet("/api/auth/refresh", token);
  },
  signIn: async (user_name, password) => {
    return await doPost({ user_name, password }, "/api/singin");
  },
  logout: async (email, password) => {
    const token = await _currentToken();
    return await doPost({ token }, "/api/auth/logout");
  },
  signUp: async (name, email, password) => {
    return await doPost({ name, user_name: email, password }, "/api/user");
  },
  currentToken: async () => {
    return await _currentToken();
  },
  guardaToken: async (token) => {
    return await _guardaToken(token);
  },
  removeToken: async () => {
    return await _removeToken();
  },
  //

  buscarPerfil: async (token) => {
    if (!token) token = await Api.currentToken();
    return await doGet("/api/users/show", token);
  },
  alterarAvatar: async (token) => {
    return await doPost("/api/user/avatar/", token);
  },
  // user gup
  buscarGrupos: async (token) => {
    return await doGet("/api/user_group", token);
  },
  entrarGrupo: async (key) => {
    const token = await Api.currentToken();
    return await doPost({}, "/api/user_group/" + key, token);
  },
  // grup
  criarGrupo: async (token, grupo) => {
    return await doPost(grupo, "/api/groups", token);
  },
  buscarGrupo: async (id) => {
    const token = await Api.currentToken();
    return await doGet("/api/user_group/" + id, token);
  },
  uploadAvatar,
  sortear: async (grupo_id) => {
    const token = await Api.currentToken();
    return await doGet("/api/draw/" + grupo_id, token);
  },
  atualizarUsuario: async (user) => {
    const token = await Api.currentToken();
    console.log("****"+user.id  )
    return await doPost(user, "/api/user/" + user.id, token);
  },
};

export default Api;
