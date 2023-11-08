const knex = require("../../conexao")

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex('produtos').where({ id }).returning('*');

        if (produto.length < 1) {
            return res.status(404).json({ mensagem: "Insira um número de produto válido" });
        }
        return res.status(200).json(produto);

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
};

module.exports = detalharProduto;