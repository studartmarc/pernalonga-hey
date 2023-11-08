const express = require("express");
//Controladores de Usuário
const cadastrarUsuario = require("./controllers/usuarios/cadastrarUsuario");
const login = require("./controllers/usuarios/login");
//Controladores de Produto
const cadastrarProduto = require("./controllers/produtos/cadastrarProduto");
const listarProdutos = require("./controllers/produtos/listarProdutos");
const detalharProduto = require("./controllers/produtos/detalharProduto");
const excluirProduto = require("./controllers/produtos/excluirProduto");
//Controladores de Pedido
const cadastrarPedido = require("./controllers/pedidos/cadastrarPedido");
const listarPedidos = require("./controllers/pedidos/listarPedidos");
//Middleware de Autenticação
const autenticarLogin = require("./middlewares/autenticacao");
//Middlewares de Validação
const validarDadosCadastro = require("./middlewares/validarDadosCadastro");
const validarDadosLogin = require("./middlewares/validarDadosLogin");
const validarProduto = require("./middlewares/validarProduto");
const validarPedido = require("./middlewares/validarPedido");
const validarData = require("./middlewares/validarData");

//Rotas
const rotas = express();
//Rotas de usuário comum
rotas.post('/usuario', validarDadosCadastro, cadastrarUsuario);
rotas.post('/login', validarDadosLogin, login);
//Autenticação
rotas.use(autenticarLogin);
//Rotas de produto
rotas.post('/produto', validarProduto, cadastrarProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', excluirProduto);
//Rotas de pedido
rotas.post('/pedido', validarPedido, validarData, cadastrarPedido);
rotas.get('/pedido', listarPedidos);

module.exports = rotas;