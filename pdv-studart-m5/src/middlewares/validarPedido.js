const knex = require("../conexao");

const validarPedido = async (req, res, next) => {
    const { pedido_produtos } = req.body;

    if (pedido_produtos.length < 1) {
        return res.status(400).json({ mensagem: "Para realizar um pedido, é necessário incluir produtos." })
    }

    for (let produto of pedido_produtos) {
        const { produto_id, quantidade_produto } = produto;

        if (quantidade_produto < 1) {
            return res.status(400).json({ mensagem: "Insira uma quantidade válida" })
        }

        const validacaoProduto = await knex('produtos').where('id', produto_id).returning('*');
        if (validacaoProduto.length < 1) {
            return res.status(404).json({ mensagem: "Insira um produto válido para processar o seu pedido." })
        }

    };

    next()
};

module.exports = validarPedido;