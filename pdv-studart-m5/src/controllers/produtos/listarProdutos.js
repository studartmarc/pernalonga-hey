const knex = require("../../conexao");

const listarProdutos = async (req, res) => {

    try {

        const produtos = await knex('produtos');
        return res.status(200).json(produtos);

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
};

module.exports = listarProdutos;