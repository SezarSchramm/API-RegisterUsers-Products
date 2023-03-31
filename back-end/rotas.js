const express = require('express');
const { cadastro, login, perfil, atualizarPerfil, obterProduto, obterProdutoId, cadastrarProduto, atualizarProdutoId, deletarProduto } = require('./controladores/funcoes');
const validação = require('./intermediarios/crypt');

const rotas = express();

rotas.post('/cadastro', cadastro);
rotas.post('/login', login);

rotas.use(validação);

rotas.get('/perfil', perfil);
rotas.put('/perfil', atualizarPerfil);

rotas.get('/produtos', obterProduto)
rotas.get('/produtos/:id', obterProdutoId)
rotas.post('/produtos', cadastrarProduto)
rotas.put('/produtos/:id/editar', atualizarProdutoId)
rotas.delete('/produtos/:id', deletarProduto)

module.exports = rotas