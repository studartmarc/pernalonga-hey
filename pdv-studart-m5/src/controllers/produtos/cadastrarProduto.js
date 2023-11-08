const knex = require("../../conexao");

const cadastrarProduto = async (req, res) => {
    const { descricao, valor, produto_imagem } = req.body;

    //UPLOAD DE IMAGEM

    try {
        const produto = {
            descricao,
            valor,
            produto_imagem
        };

        const novoProduto = await knex('produtos').insert(produto).returning('*');

        return res.status(201).json(novoProduto);

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
};

module.exports = cadastrarProduto;