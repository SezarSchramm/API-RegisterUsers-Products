const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const knex = require('../conexao');

const cadastro = async (req, res) => {

    const { nome, email, senha, nome_loja } = req.body;

    try {

        if (!nome || !email || !senha || !nome_loja) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatorios." })
        }

        const usuario = await knex('usuarios').where({ email }).first()

        if (usuario) {
            return res.status(400).json({ mensagem: 'E-mail informado já existe.' })
        }

        const senhaCripty = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios').insert({
            nome,
            nome_loja,
            email,
            senha: senhaCripty
        }).returning('*')

        res.status(201).json({ nome: novoUsuario[0].nome, nome_loja: novoUsuario[0].nome_loja, email: novoUsuario[0].email, senha: novoUsuario[0].senha })
    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Preencher todos os campos' })
        }

        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(400).json({ mensagem: 'E-mail ou senha incorreto.' })
        }

        const validarSenha = await bcrypt.compare(senha, usuario.senha)

        if (!validarSenha) {
            return res.status(400).json({ mensagem: 'E-mail ou senha incorreto.' })
        }

        const token = jwt.sign({ id: usuario.id }, senha)

        const { senha: _, ...restoUsuario } = usuario

        res.status(200).json({ usuario: restoUsuario, token })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const perfil = async (req, res) => {
    const usuario = req.usuario
    try {

        res.status(200).json(usuario)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const atualizarPerfil = async (req, res) => {
    const { id } = req.usuario
    const { nome, email, senha, nome_loja } = req.body

    try {
        const senhaCrypt = await bcrypt.hash(senha, 10)

        const usuario = await knex('usuarios').where({ email }).first()

        if (usuario) {
            return res.status(400).json({ mensagem: 'E-mail existente.' })
        }

        const atualizar = await knex('usuarios').where({ id }).update({
            nome: nome ? nome : req.usuario.nome,
            email: email ? email : req.usuario.email,
            senha: senha ? senhaCrypt : req.usuario.senha,
            nome_loja: nome_loja ? nome_loja : req.usuario.nome_loja,
        }).returning()

        if (!atualizar) {
            return res.status(400).json({ mensagem: 'Falha na atualização!' })
        }

        res.status(200).json({ mensagem: 'Perfil atualizado' })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message)
    }



}

const obterProduto = async (req, res) => {
    const { id } = req.usuario

    try {

        const produtos = await knex('produtos').where('usuario_id', id)

        if (produtos === undefined) {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }

        res.status(200).json(produtos)

    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const obterProdutoId = async (req, res) => {
    const usuario = req.usuario
    const { id } = req.params

    try {

        const produto = await knex('produtos').where('id', id).first()

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado!" })
        }

        if (produto.usuario_id !== usuario.id) {
            return res.status(400).json({ mensagem: 'Produto de outro usuario!' })
        }

        res.status(200).json(produto)

    } catch (error) {
        return res.status(500).json(error.message)

    }

}

const cadastrarProduto = async (req, res) => {
    const { id } = req.usuario
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body


    try {

        if (!nome) {
            return res.status(400).json({ mensagem: 'Campo nome obrigatorio!' })
        }
        if (!estoque) {
            return res.status(400).json({ mensagem: 'Campo estoque obrigatorio!' })
        }
        if (!preco) {
            return res.status(400).json({ mensagem: 'Campo preco obrigatorio!' })
        }
        if (!descricao) {
            return res.status(400).json({ mensagem: 'Campo descricao obrigatorio!' })
        }

        const cadastro = await knex('produtos').insert({
            usuario_id: id,
            nome,
            estoque,
            categoria,
            preco,
            descricao,
            imagem
        }).returning()

        if (!cadastro) {
            return res.status(400).json({ mensagem: "Falha no casdastro!" })
        }

        res.status(201).json({ mensagem: "Produto cadastrado com sucesso" })


    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const atualizarProdutoId = async (req, res) => {
    const usuario = req.usuario
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body
    const { id } = req.params


    try {

        if (!nome) {
            return res.status(400).json({ mensagem: 'Campo nome obrigatorio!' })
        }
        if (!estoque) {
            return res.status(400).json({ mensagem: 'Campo estoque obrigatorio!' })
        }
        if (!preco) {
            return res.status(400).json({ mensagem: 'Campo preco obrigatorio!' })
        }
        if (!descricao) {
            return res.status(400).json({ mensagem: 'Campo descricao obrigatorio!' })

        }

        const produto = await knex('produtos').where({ id }).first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado!' })

        }

        if (produto.usuario_id !== usuario.id) {
            return res.status(404).json({ mensagem: 'Produto de outro usuario!' })

        }
        const atualizar = await knex('produtos').where({ id }).update({
            nome,
            estoque,
            categoria,
            preco,
            descricao,
            imagem
        }).returning()

        if (!atualizar) {
            return res.status(404).json({ mensagem: 'Falha na atualização' })

        }

        res.status(200).json({ mensagem: "Produto atualizado com sucesso!" })

    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const deletarProduto = async (req, res) => {
    const usuario = req.usuario
    const { id } = req.params

    try {
        const produto = await knex('produtos').where({ id }).first()
        console.log(produto);

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado!" })

        }

        if (produto.usuario_id !== usuario.id) {
            return res.status(404).json({ mensagem: 'Produto de outro usuario!' })

        }

        const deletarProduto = await knex('produtos').delete().where({ id })

        res.status(200).json({ mensagem: "Produto deletado com sucesso!" })

    } catch (error) {
        return res.status(500).json(error.message)

    }

}

module.exports = {
    cadastro,
    login,
    perfil,
    atualizarPerfil,
    obterProduto,
    obterProdutoId,
    cadastrarProduto,
    atualizarProdutoId,
    deletarProduto
}