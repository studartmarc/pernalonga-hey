calcularValorDaCompra = function (metodoDePagamento, itens) {
    const cardapio = require("../cardapio");
    let carrinhoDeCompras = [];
    let validacaoCodigos = true;

    for (let cadaPedido of itens) {
        let arrayCadaPedido = cadaPedido.split(",");
        validacaoCodigos = cardapio.some((produto) => {
            return produto.codigo === arrayCadaPedido[0];
        });
        if (validacaoCodigos === true) {
            let valorUnit = cardapio.find((produto) => {
                return produto.codigo === arrayCadaPedido[0];
            })
            carrinhoDeCompras.push({
                codigo: arrayCadaPedido[0],
                quantidade: Number(arrayCadaPedido[1]),
                valorUnit: valorUnit.valor,
            });
        } else {
            break;
        }
    };
    console.log(carrinhoDeCompras)

    let validacaoQuantidade = carrinhoDeCompras.some((produto) => {
        return produto.quantidade === 0;
    });
    let validacaoSanduiche = carrinhoDeCompras.some((produto) => {
        return produto.codigo === "sanduiche";
    });
    let validacaoQueijo = carrinhoDeCompras.some((produto) => {
        return produto.codigo === "queijo";
    });
    let validacaoCafe = carrinhoDeCompras.some((produto) => {
        return produto.codigo === "cafe";
    });
    let validacaoChantily = carrinhoDeCompras.some((produto) => {
        return produto.codigo === "chantily";
    });

    let validacaoSanduicheComQueijo = true;
    if ((validacaoQueijo) && (!validacaoSanduiche)) {
        validacaoSanduicheComQueijo = false;
    } else {
        validacaoSanduicheComQueijo = true;
    };

    let validacaoCafeComChantily = true;
    if ((validacaoChantily) && (!validacaoCafe)) {
        validacaoCafeComChantily = false;
    } else {
        validacaoCafeComChantily = true;
    };

    let desconto = 0;
    if (metodoDePagamento === "dinheiro") {
        desconto = 0.95;
    } else if (metodoDePagamento === "debito") {
        desconto = 1;
    } else if (metodoDePagamento === "credito") {
        desconto = 1.03;
    } else {
        desconto = -1;
    };

    let totalAPagar = 0;
    let valorAPagar = 0;
    for (let cadaItem of carrinhoDeCompras) {
        valorAPagar += (cadaItem.valorUnit) * (cadaItem.quantidade);
    };
    totalAPagar = valorAPagar * desconto;

    if (validacaoCodigos === false) {
        console.log("Item inválido!");
    } else if (validacaoQuantidade === true) {
        console.log("Quantidade inválida!");
    } else if (validacaoCafeComChantily === false || validacaoSanduicheComQueijo === false) {
        console.log("Item extra não pode ser pedido sem o principal")
    } else if (totalAPagar < 0) {
        console.log("Forma de pagamento inválida!")
    } else {
        console.log(`Compra Autorizada: Total a pagar R$ ${(totalAPagar / 100).toFixed(2)}`);
    };
};



// if (arrayCadaPedido[1] == 0) {
//     console.log("Quantidade inválida!");
// } else if (validadorCodigoItens === false) {
//     console.log("Item inválido!");
// } else {

// const validadorCodigoItens = () => {
//     for (let cadaPedido of itens) {
//         let arrayValidador = cadaPedido.split(",");
//         cardapio.some((itemAtual) => {
//             return itemAtual.codigo === arrayValidador[0];
//         });
//     };
// };


//     let resultado = () => {
//         if (totalAPagar < 0) {
//             console.log("Forma de pagamento inválida!");
//         } else if (!validacaoItemExtra) {
//             console.log("Item extra não pode ser pedido sem o principal");
//         } else if (carrinhoDeCompras.length === 0) {
//             console.log("Não há itens no carrinho de compra!");
//         } else {
//             console.log(`"R$ ${(totalAPagar / 100).toFixed(2)}"`)
//         };
//     };
//     return resultado;
// };
//};
const minhaCompra = ["cafe,1", "chantily,1"];

calcularValorDaCompra("debito", minhaCompra);