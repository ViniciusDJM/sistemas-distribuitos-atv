require("dotenv").config();
const express = require("express");
const clienteRoutes = require("./routes/cliente");
const produtoRoutes = require("./routes/produto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API de Produtos e Clientes" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: "Erro interno do servidor",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Rota não encontrada",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
