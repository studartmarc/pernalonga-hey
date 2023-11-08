const knex = require("../conexao");

const validarDadosCadastro = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Existem campos que não foram informados, não sendo possível realizar esta requisição." })
    };

    if (nome.trim() == "" || email.trim() == "" || String(senha).trim() == "") {
        return res.status(400).json({ mensagem: "Existem campos em branco, não sendo possível realizar esta requisição" })
    };

    if (email.indexOf("@") < 0 || email[0] == "." || email.slice(-1) == ".") {
        return res.status(400).json({ mensagem: "Insira um e-mail válido." })
    };

    const validacaoEmail = await knex('usuarios').select('*').where('email', email).returning('*');

    if (validacaoEmail.length > 0) {
        return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." })
    }

    next()
};

module.exports = validarDadosCadastro;