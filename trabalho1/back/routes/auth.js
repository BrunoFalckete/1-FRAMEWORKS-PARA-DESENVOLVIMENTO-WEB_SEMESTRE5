// Importa as bibliotecas e módulos necessários
const express = require('express'); // Express.js é um framework para criação de APIs web em Node.js
const router = express.Router(); // Cria um objeto de roteamento do Express
const jwt = require('jsonwebtoken'); // Biblioteca para criação e verificação de tokens JWT
const secretKey = process.env.SECRET; // Obtém a chave secreta do ambiente
const { PrismaClient } = require('@prisma/client'); // Importa o PrismaClient para interagir com o banco de dados
const prisma = new PrismaClient(); // Cria uma instância do PrismaClient para interagir com o banco de dados

// Rota para login de usuários
router.post('/login', async (req, res) => {
    // Obtém o email e a senha do corpo da requisição
    const email = req.body.email;
    const password = req.body.password;

    // Procura um usuário no banco de dados com o email fornecido
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    // Verifica se o usuário não existe ou a senha está incorreta
    if (!user || user.password !== password) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
    }

    // Cria um token JWT com o ID do usuário e a chave secreta
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

    // Retorna o token como resposta
    res.json({ token });
});

// Rota para registro de novos usuários
router.post('/register', async (req, res) => {
    // Obtém o email e a senha do corpo da requisição
    const email = req.body.email;
    const password = req.body.password;

    // Verifica se já existe um usuário com o mesmo email no banco de dados
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    // Se o usuário já existe, retorna um erro
    if (existingUser) {
        res.status(400).json({ message: 'Este email já está em uso' });
        return;
    }

    // Cria um novo usuário no banco de dados
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: password,
        },
    });

    // Cria um token JWT com o ID do novo usuário e a chave secreta
    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });

    // Retorna o token como resposta
    res.json({ token });
});

// Exporta o objeto de roteamento para ser usado em outros módulos
module.exports = router;
