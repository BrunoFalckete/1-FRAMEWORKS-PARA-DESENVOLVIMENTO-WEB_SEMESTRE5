const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET; // Chave secreta para assinar os tokens

// Função para gerar um token JWT
function generateToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expira em 1 hora
}

// Middleware para verificar o token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization'); // Obtenha o token do cabeçalho de autorização
  if (!token) return res.status(401).json({ message: 'Acesso não autorizado' });

  // Verifique se o token JWT é válido
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user; // Armazene o usuário decodificado na solicitação para uso posterior
    next(); // Continue com a execução da rota
  });
}

module.exports = { generateToken, authenticateToken };
