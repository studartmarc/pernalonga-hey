const validarProduto = async (req, res, next) => {
    const { descricao, valor } = req.body;

    if (!descricao || !valor) {
        return res.status(400).json({ mensagem: "Existem campos que não foram informados, não sendo possível realizar esta requisição." })
    };

    if (descricao.trim() == "" || String(valor).trim() == "") {
        return res.status(400).json({ mensagem: "Existem campos em branco, não sendo possível realizar esta requisição" })
    };

    next();
};

module.exports = validarProduto;