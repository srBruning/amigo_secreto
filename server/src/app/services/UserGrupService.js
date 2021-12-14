const UserGrupo = require("../models/UserGrupo");
const User = require("../models/User");
const AmGrupo = require("../models/AmGrupo");
const AppPicture = require("../models/AppPicture");

const tratarErroCadastro = (err, res) => {
  if (err.name === "SequelizeForeignKeyConstraintError") {
    if (err.fields[0] == "user_id")
      return res.status(400).send({
        message: "Usuário não encontrado",
        fields_errors: err.errors,
      });

    if (err.fields[0] == "grupo_id")
      return res.status(400).send({
        message: "Grupo não encontrado",
        fields_errors: err.errors,
      });
  }

  if (err.name === "SequelizeUniqueConstraintError")
    return res.status(400).send({ message: "Voce ja pertence a esse grupo" });

  if (err.name === "SequelizeValidationError")
    return res.status(400).send({ fields_errors: err.errors });

  return res.status(500).send({
    message: err.message,
    stack: err.stack,
    fields_errors: err.errors,
  });
};

const findByGrupId = async (grupo_id, userId) => {
  return await UserGrupo.findAll({
    where: {
      grupo_id: grupo_id,
      user_id: userId,
    },
    include: [
      {
        model: User.scope("withoutPassword"),
        as: "friend",
        include: { model: AppPicture, as: "picture_avatar" },
      },
      {
        model: AmGrupo,
        as: "grupo",
        include: [
          {
            model: UserGrupo.scope("withoutFriend"),
            as: "membros",
            include: [
              {
                model: User.scope("withoutPassword"),
                as: "user",
                include: { model: AppPicture, as: "picture_avatar" },
              },
            ],
          },
        ],
      },
    ],
  });
};

const shuffle = (array) => {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const drawFriends = async (grupo_id) => {
  let list = await UserGrupo.findAll({
    where: {
      grupo_id: grupo_id,
    },
  });

  for (let index = 0; index < list.length; index++) {
    const userGrup = list[index];
    userGrup.drawn_user_id = null;
    await userGrup.save();
  }
  list = shuffle(list);
  let aux = list[list.length - 1];
  for (let index = 0; index < list.length; index++) {
    const userGrup = list[index];
    userGrup.drawn_user_id = aux.user_id;
    aux = userGrup;
    await userGrup.save();
  }
};

export { tratarErroCadastro, drawFriends, findByGrupId };
