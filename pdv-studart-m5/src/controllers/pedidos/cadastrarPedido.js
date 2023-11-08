const knex = require("../../conexao");
const { format } = require("date-fns");

const cadastrarPedido = async (req, res) => {
    const { pedido_produtos } = req.body;
    let { data } = req.body;

    try {

        if (data === undefined) {
            const agora = new Date();
            data = format(agora, "yyyy-MM-dd");
        };

        const novoPedido = {
            data,
            valor_total: 0,
        };

        const pedido = await knex('pedidos').insert(novoPedido).returning('*');

        let somaTotal = 0;

        for (let produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = produto;

            const infoProduto = await knex('produtos').where('id', produto_id).returning('*');

            somaTotal += infoProduto[0].valor * quantidade_produto;

            const produtoPedido = {
                pedido_id: pedido[0].id,
                produto_id,
                quantidade_produto
            };
            await knex('pedido_produtos').insert(produtoPedido).returning('*');
        }

        await knex('pedidos').update('valor_total', somaTotal).where('id', pedido[0].id);

        return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso!" });

    } catch (erro) {
        return res.status(500).json({ erro })
    };
};

module.exports = cadastrarPedido;