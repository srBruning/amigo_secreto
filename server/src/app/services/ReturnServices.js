const rollbar = required("../../rollbar");

const unauthorized = (res) => {
  return res
    .status(401)
    .send({ error: "Usuario não tem permição para alterar" });
};

const internal = (res, err) => {
  rollbar.log(err);
  res.status(500).send(err);
};

const errorFormater = (err, res) => {
  if (err.name === "SequelizeValidationError")
    return res.status(400).send({ fields_errors: err.errors });

  return internal(err);
};

module.export = {
  unauthorized,
  internal,
  errorFormater,
};
