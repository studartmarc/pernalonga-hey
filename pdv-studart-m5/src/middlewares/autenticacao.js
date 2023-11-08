const jwt = require('jsonwebtoken');
const senhaJwt = require("../senhaJwt");
const knex = require('../conexao');

const autenticarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    };

    try {
        const token = authorization.split(" ")[1];

        const { id } = jwt.verify(token, senhaJwt);

        const usuarioAutenticado = await knex('usuarios').select('*').where({ id }).returning('id', 'nome', 'email');

        req.usuarioLogado = usuarioAutenticado;

        next()
    } catch (erro) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
};

module.exports = autenticarLogin;