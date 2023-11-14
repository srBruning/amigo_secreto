require("dotenv-safe").config();
const User = require("../models/User");
const AmGrupo = require("../models/AmGrupo");
const UserGrupo = require("../models/UserGrupo");
const AppPicture = require("../models/AppPicture");
const pictureService = require("../services/PictureSevice");
const uService = require("../services/UserService");
const {
  internal,
  errorFormater,
  unauthorized,
} = require("../services/ReturnServices");
const {
  passwordValidate,
  authorizedserFields,
  findUserById,
  padronizaCamposFile,
  alterarPictureAvatar,
} = uService;
class UserController {
  /**
   * Salva um novo usuário e retorna o token
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async store(req, res) {
    try {
      const _user = req.body;
      passwordValidate(_user);

      const user = await User.create(req.body);

      return await res.json(await uService.login(user));
    } catch (err) {
      if (err.code) return res.status(err.code).send(err);

      if (err.name === "SequelizeUniqueConstraintError")
        return res
          .status(400)
          .send({ message: "nome de usuário ja esta em uso" });

      return errorFormater(err, res);
    }
  }

  async update(req, res) {
    try {
      if (req.params.id != req.userId) return unauthorized(res);

      const _user = authorizedserFields(req.body);
      passwordValidate(_user);

      const user = await User.findByPk(req.userId);
      if (user == null) return res.status(404);

      user.update(_user);
      user.save();

      user.password = undefined;
      return res.json(user);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError")
        return res
          .status(400)
          .send({ message: "nome de usuário ja esta em uso" });

      return errorFormater(err, res);
    }
  }

  async index(req, res) {
    try {
      const users = await User.scope("withoutPassword").findAll();
      return res.json(users);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }

  async show(req, res) {
    try {
      const id = req.params && req.params.id ? req.params.id : req.userId;

      return res.json(await findUserById(id, true));
    } catch (err) {
      errorFormater(err, res);
    }
  }

  async updateAvatar(req, res) {
    try {
      padronizaCamposFile(req);

      const user = await findUserById(req.userId);

      const current_picture_avatar = user.picture_avatar;

      alterarPictureAvatar(user, req.file);

      if (current_picture_avatar)
        try {
          pictureService.deletePicture(current_picture_avatar);
        } catch (error) {
          console.log("Erro ao deletar imagem antiga", error);
        }

      return res.json({ id: user.id, picture_avatar: user.picture_avatar });
    } catch (err) {
      errorFormater(err, res);
    }
  }

  async login(req, res) {
    try {
      if(! req.body.user_name ||  req.body.user_name==""){
        return  res.status(400).send({ error: "nome de usuário é requerido" });
      }
      const users = await User.findAll({
        where: {
          user_name: req.body.user_name,
          password: req.body.password,
        },
      });
      return res.json(await uService.login(users ? users[0] : null));
    } catch (err) {
      if (err.code) return res.status(err.code).send(err);
      return errorFormater(err, res);
    }
  }

  async refresh(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      return res.json(await uService.login(user));
    } catch (err) {
      if (err.code) return res.status(err.code).send(err);
      errorFormater(err, res);
    }
  }
}

module.exports = new UserController();
