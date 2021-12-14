require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const AmGrupo = require("../models/AmGrupo");
const UserGrupo = require("../models/UserGrupo");
const { makeKey, grupSave } = require("../services/GroupService");

class GroupController {
  async store(req, res) {
    try {
      const groupo = await grupSave(req.body, req.userId);
      return res.json(groupo);
    } catch (err) {
      if (err.message) return res.status(400).send(err);

      res.status(500).send(err);
    }
  }

  async index(req, res) {
    try {
      const grupos = await AmGrupo.findAll();
      return res.json(grupos);
    } catch (err) {
      res
        .status(500)
        .send({ error: err, message: err.message, stack: err.stack });
    }
  }

  async show(req, res) {
    try {
      const grupo = await AmGrupo.findByPk(req.params.id, {
        include: [
          {
            model: UserGrupo.scope("withoutFriend"),
            as: "membros",
            include: "user",
          },
        ],
      });
      return res.json(grupo);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
}

module.exports = new GroupController();
