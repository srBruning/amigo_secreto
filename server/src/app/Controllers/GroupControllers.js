require("dotenv-safe").config();
const AmGrupo = require("../models/AmGrupo");
const UserGrupo = require("../models/UserGrupo");
const { makeKey, groupSave } = require("../services/GroupService");
const rollbar = require("../../rollbar");
const {internal} = require('../services/ReturnServices');

class GroupController {
  async store(req, res) {
    try {
      const groupo = await groupSave(req.body, req.userId);
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
      internal(res, err);
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
      internal(res, err);
    }
  }
}

module.exports = new GroupController();
