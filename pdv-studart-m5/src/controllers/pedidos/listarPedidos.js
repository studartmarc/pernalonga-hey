const knex = require("../../conexao");

const listarPedidos = async (req, res) => {
    let { a_partir } = req.query;

    try {

        if (a_partir !== undefined) {
            const validacaoData = a_partir.split("-");
            if (validacaoData.length != 3) {
                return res.status(400).json({ mensagem: "Insira uma data no seguinte formato válido: dd-MM-yyyy" })
            }
        } else {
            a_partir = "01-01-1900";
        }

        const pedidos = await knex('pedidos')
            .where('data', '>=', a_partir)
            .select('*');

        if (pedidos.length < 1) {
            return res.status(400).json({ mensagem: "Não foram encontrados pedidos." });
        }

        const pedidosDetalhados = [];

        const produtos = await knex('pedido_produtos')
            .join('produtos', 'pedido_produtos.produto_id', 'produtos.id')
            .select('pedido_produtos.*', 'produtos.valor');

        for (let pedido of pedidos) {
            const produtosPedido = produtos.filter((client) => {
                return client.pedido_id == String(pedido.id);
            });

            const pedidoDetalhado = {
                pedido,
                pedido_produtos: produtosPedido,
            }
            pedidosDetalhados.push(pedidoDetalhado);
        }

        return res.status(200).json(pedidosDetalhados);

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    };
};


module.exports = listarPedidos;