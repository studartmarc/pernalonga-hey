const validarDadosLogin = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Existem campos que não foram informados, não sendo possível realizar esta requisição." })
    };

    if (email.trim() == "" || String(senha).trim() == "") {
        return res.status(400).json({ mensagem: "Existem campos em branco, não sendo possível realizar esta requisição" })
    };

    if (email.indexOf("@") < 0 || email[0] == "." || email.slice(-1) == ".") {
        return res.status(400).json({ mensagem: "Insira um e-mail válido." })
    };

    next();
};

module.exports = validarDadosLogin;