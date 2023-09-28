// Importe os pacotes necessários
const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Importe o PrismaClient para interagir com o banco de dados
const axios = require('axios'); // Importe o Axios para fazer solicitações HTTP
const cors = require('cors');
const {authenticateToken} = require('./middlewares/jwt');


// Crie uma instância do aplicativo Express
const app = express();
const authRouter = require('./routes/auth'); // Importe o roteador de autenticação
const productsRouter = require('./routes/products'); // Importe o roteador de produtos

// CONFIGURAÇÕES DO SERVDOR
app.use(cors()); // Habilita o uso do middleware CORS para lidar com solicitações de diferentes origens
app.use(express.json()); // Habilita o middleware para análise de JSON no corpo das solicitações
app.use(express.urlencoded({ extended: false })); // Habilita o middleware para análise de dados de formulário

// MIDDLEWARES
app.use('/products', authenticateToken);

// ROTAS
app.use('/', productsRouter); // Define as rotas de produtos com o prefixo "/"
app.use('/', authRouter); // Define as rotas de autenticação com o prefixo "/"

// Crie uma instância do PrismaClient para interagir com o banco de dados
const prisma = new PrismaClient();

async function main() {
  // primeiro verifica se o sistema já possui produtos cadastrados, para não reinseri-los
  const existingProduct = await prisma.product.findUnique({
      where: { id: 1 },
  });

  if (existingProduct) {
      console.log('Produtos já incluídos no sistema');
      return;
  }

  console.log('Inserindo Produtos no sistema');

  // buscar dados no dummyjson, use limit como 100 para trazer todos
  const apiUrl = 'https://dummyjson.com/products?limit=100';

  // Fazer a requisição GET
  axios.get(apiUrl)
      .then(async response => {
          response.data.products.forEach(async (product) => {
              await prisma.product.create({
                  data: {...product, images: { create: product.images.map(i => ({url: i})) } }
              })
              .then(e => console.log('Produtos foram inseridos'))
              .catch(e => console.log('Erro ao salvar produtos', e));
          });
      })
      .catch(error => {
          console.error('Erro na requisição:', error);
      });
}

main()
  .then(async () => {
      await prisma.$disconnect()
  })
  .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
  })

// Rota para obter todos os produtos
module.exports = app;
