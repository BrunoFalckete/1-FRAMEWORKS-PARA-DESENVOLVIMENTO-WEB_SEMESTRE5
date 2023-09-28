var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Rota para obter todos os produtos do banco de dados usando o Prisma
router.get('/products', async (req, res) => {
    try {
      // Faça uma consulta ao banco de dados para obter todos os produtos
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      res.status(500).json({ message: 'Erro ao obter produtos' });
    }
});
  
  // Rota para adicionar um novo produto no banco de dados usando o Prisma
router.post('/products', async (req, res) => {
    const newProduct = req.body;
  
    try {
      // Crie um novo produto no banco de dados usando o Prisma
      const product = await prisma.product.create({
        data: newProduct,
      });
      res.status(201).json(product);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
});
  
// Rota para atualizar um produto por ID no banco de dados usando o Prisma
router.put('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
  
    try {
      // Atualize o produto no banco de dados usando o Prisma
      const product = await prisma.product.update({
        where: { id: productId },
        data: updatedProduct,
      });
      res.json(product);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
});
  
// Rota para excluir um produto por ID no banco de dados usando o Prisma
router.delete('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
  
    try {
      // Exclua o produto do banco de dados usando o Prisma
      await prisma.product.delete({
        where: { id: productId },
      });
      res.status(204).send(); // Responda com o status 204 (Sem Conteúdo) para indicar que o produto foi excluído com sucesso
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      res.status(500).json({ message: 'Erro ao excluir produto' });
    }
});

module.exports = router;
