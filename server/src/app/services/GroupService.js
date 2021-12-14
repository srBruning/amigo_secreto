const UserGrupo = require("../models/UserGrupo");
const AmGrupo = require("../models/AmGrupo");

/**
 * Montar uma chave de grupo aleatória com o tamanho especificado mais um dígito verificador.
 * A chave não é o ID da tabela, mas é utilizada para compartilhar o grupo.
 * @param {*} length
 * @returns
 */
const makeKey = (length) => {
  var result = "";
  var characters =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  let digito = 0;
  for (var i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(idx);
    digito = (length - i) * idx;
  }
  while (digito > 9) digito = digito % length;
  return result + digito;
};

const groupSave = async (pGrup, user_id) => {
  try {
    pGrup.chave = makeKey(6);
    pGrup.id_dono = user_id;
    const group = await AmGrupo.create(pGrup);

    // associa o usuario ao grupo
    let user_grup = { grupo_id: group.id, user_id };
    const response = await UserGrupo.create(user_grup);

    return group;
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError")
      throw { message: "nome de grupo ja está em uso" };

    if (err.name === "SequelizeValidationError")
      throw { fields_errors: err.errors, message: "Erro na validação de campos " };

    throw { error: err };
  }
};

module.export =  { makeKey, groupSave };
