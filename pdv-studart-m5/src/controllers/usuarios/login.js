const knex = require("../../conexao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require("../../senhaJwt");

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knex('usuarios').select('*').where({ email }).returning('*');

        if (usuario.length < 1) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const senhaVerificada = await bcrypt.compare(senha, usuario[0].senha);
        if (!senhaVerificada) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const token = jwt.sign({ id: usuario[0].id }, senhaJwt, { expiresIn: "8h" });

        const { senha: _, ...usuarioLogado } = usuario[0];

        return res.status(200).json({ login: usuarioLogado, token });

    } catch (erro) {
        return res.status(500).json({ erro })
    };
}

module.exports = login;