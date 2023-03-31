create database market_cubos

create table usuarios(
id serial primary key,
nome text,
nome_loja text,
email text unique,
senha text
)

create table produtos(
id serial primary key,
usuario_id integer references usuarios(id),
nome text,
estoque integer,
categoria text,
preco integer,
descricao text,
imagem text
)
