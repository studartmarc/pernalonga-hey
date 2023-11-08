const validarData = async (req, res, next) => {
    const { data } = req.body;

    if (data) {
        const validacaoData = data.split("-");
        if (validacaoData.length != 3) {
            return res.status(400).json({ mensagem: "Insira uma data no seguinte formato válido: dd-MM-yyyy" })
        }
    }

    next()
};


module.exports = validarData;