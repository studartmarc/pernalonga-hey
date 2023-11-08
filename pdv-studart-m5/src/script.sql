--criação da base de dados
create database pdv;
--criação da tabela usuarios
create table usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null);
--criação da tabela produtos
create table produtos (
    id serial primary key,
    descricao text not null,
    valor integer not null,
    produto_imagem text);
--criação da tabela pedidos
create table pedidos (
    id serial primary key,
    data date not null,
    valor_total integer not null);
--criação da tabela pedido_produtos
create table pedido_produtos (
    id serial primary key,
    pedido_id integer references pedidos(id) not null,
    produto_id integer references produtos(id) not null,
    quantidade_produto integer not null);