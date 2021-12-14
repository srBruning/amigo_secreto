require("dotenv-safe").config();
const UserGrupo = require("../models/UserGrupo");
const AmGrupo = require("../models/AmGrupo");
const {
  tratarErroCadastro,
  drawFriends,
  findByGrupId,
} = require("../services/UserGrupService");
class UserGroupController {
  async store(req, res) {
    try {
      const listGrupo = await AmGrupo.findAll({
        where: {
          chave: req.params.key,
        },
      });

      if (listGrupo.length != 1) {
        res.status(404).send({ message: "Nenhum grupo encontrado" });
        return;
      }
      let user_grup = { grupo_id: listGrupo[0].id, user_id: req.userId };

      const response = await UserGrupo.create(user_grup);
      return res.json(response);
    } catch (err) {
      return tratarErroCadastro(err, res);
    }
  }

  async index(req, res) {
    try {
      const user_grupo = await UserGrupo.findAll({
        where: {
          user_id: req.userId,
        },
        include: [
          {
            model: AmGrupo,
            as: "grupo",
          },
        ],
      });

      return res.json(user_grupo);
    } catch (err) {
      res
        .status(500)
        .send({ error: err, message: err.message, stack: err.stack });
    }
  }

  async byGrupId(req, res) {
    try {
      const user_grupo = await findByGrupId(  req.params.grupo_id,   req.userId);

      if (user_grupo == undefined || user_grupo.length == 0) {
        return null;
      }
      const lst = user_grupo.map((node) => node.get({ plain: true }));
      const ret = lst[0];
      ret.is_dono = req.userId == ret.grupo.id_dono;

      return res.json(ret);
    } catch (err) {
      res
        .status(500)
        .send({ error: err, message: err.message, stack: err.stack });
    }
  }

  async draw(req, res) {
    try {
      const grupo = await AmGrupo.findByPk(req.params.grupo_id);
      if (!grupo) {
        res.status(404).send({ message: "Nenhum grupo encontrado" });
      }
      if (grupo.id_dono != req.userId) {
        res.status(400).send({
          message: "Somente o administador do grupo pode gerar o sorteio",
        });
      }

      let list = await drawFriends(req.params.grupo_id);

      grupo.drawn_at = Date.now();
      await grupo.save();
      return res.json(list);
    } catch (err) {
      res
        .status(500)
        .send({ error: err, message: err.message, stack: err.stack });
    }
  }
}


module.exports = new UserGroupController();
