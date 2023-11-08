const knex = require("../../conexao");

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExcluido = await knex('produtos').del().where({ id }).returning('*');

        if (produtoExcluido.length < 1) {
            return res.status(404).json({ mensagem: "Insira um número de produto válido" });
        }

        return res.status(204).json({ mensagem: "Produto excluído com sucesso!" });

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = excluirProduto;