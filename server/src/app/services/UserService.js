const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AmGrupo = require("../models/AmGrupo");
const UserGrupo = require("../models/UserGrupo");
const AppPicture = require("../models/AppPicture");

const login = async (user) => {
  if (user) {
    const token = await jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 10000,
    });
    return { id: user.id, token: token };
  }
  throw { message: "não autorizado", code: 401 };
};

//
const passwordValidate = (password) => {
  if (!password || password.length < 5) {
    throw {
      error: "the password must contain at least 5 characters",
      code: 400,
    };
  }

  return true;
};

const formatarError = (err, res) => {
  if (err.name === "SequelizeValidationError")
    return res.status(400).send({ fields_errors: err.errors });

  return res.status(500).send({ error: err });
};

const authorizedserFields = (user) => {
  user.user_name = undefined;
  user.picture_avatar_id = undefined;
  user.picture_avatar = undefined;

  return user;
};

const findUserById = async (userid, group = false) => {
  const include = [{ model: AppPicture, as: "picture_avatar" }];
  if (group)
    include.push({
      model: UserGrupo.scope("withoutFriend"),
      as: "grupos",
      include: [{ model: AmGrupo, as: "grupo" }],
    });

  return await User.scope("withoutPassword").findByPk(userid, {
    include,
  });
};

const padronizaCamposFile = (req) => {
  if (!req.file.Location) {
    if (req.file.xs) {
      req.file.Key = req.file.key;
      req.file.Location = req.file.xs.Location;
    } else req.file.Location = `${process.env.APP_URL}/files/${req.file.Key}`;
  }
};

const alterarPictureAvatar = async (user, file) => {
  user.picture_avatar = await AppPicture.create({
    url: file.Location,
    key: file.Key,
    original_name: file.originalname,
  });
  user.picture_avatar_id = user.picture_avatar.id;
  user.save();

  return user;
};

module.export = {
  login,
  passwordValidate,
  formatarError,
  authorizedserFields,
  findUserById,
  padronizaCamposFile,
  alterarPictureAvatar,
};
