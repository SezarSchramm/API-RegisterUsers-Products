const jwt = require('jsonwebtoken');
const knex = require('../conexao');
const senha = require('../senhaSegura');


const validação = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, senha)

        const usuario = await knex('usuarios').where({ id }).first()

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Não autorizado.' })
        }

        const { senha: _, ...restoUsuario } = usuario

        req.usuario = restoUsuario
        next()

    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado!!' })
    }
}

module.exports = validação