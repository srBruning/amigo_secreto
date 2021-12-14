
const unauthorized = (res)=>{
    return res
    .status(401)
    .send({ error: "Usuario não tem permição para alterar" });
}

module.export =  {
    unauthorized,
}