// Importa o framework Express para criar e gerenciar o servidor web
const express = require("express");
const rotas = require("./routes");

const path = require('path');
const dotenv = require("dotenv");
const cors = require('cors');
//  carrega o arquivo .env (que está na pasta server)
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });


// Cria uma instância do aplicativo Express
const app = express();
app.use(cors());

// 4️⃣ define a porta do servidor
// se existir PORT no .env, usa ela; senão, usa 3000
const port = process.env.PORT || 3000;

// Middleware para permitir o envio de dados em formato JSON no corpo das requisições
app.use(express.json());



// Inicia o servidor na porta definida e exibe uma mensagem no console
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});

// Servir imagens estáticas da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usando as rotas
app.use('/api', rotas);

// Middleware para rotas não encontradas
app.use(function(_req, res){
  res.status(404).json({ error: "Rota não encontrada"});
});