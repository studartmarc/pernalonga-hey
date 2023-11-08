const bcrypt = require('bcrypt');
const knex = require("../../conexao");
const transporter = require('../../services/email');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaSegura = await bcrypt.hash(senha, 10);

        const usuario = {
            nome,
            email,
            senha: senhaSegura
        }

        await knex('usuarios').insert(usuario);

        transporter.sendMail({
            from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
            to: `${usuario.nome} <${usuario.email}>`,
            subject: "Seja Bem-vindo ao time!",
            html: `
            <h1>Olá ${usuario.nome}! Seu cadastro foi concluído com sucesso!</h1>
            <p>Seja bem vindo ao nosso time! Acesse o endpoint /login para continuar seu acesso!</p>`
        })

        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso! Você receberá um e-mail de boas-vindas!" });

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
};

module.exports = cadastrarUsuario;