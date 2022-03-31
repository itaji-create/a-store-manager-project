require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
const ProductsRouter = require('./routers/productsRouter');
const SalesRouter = require('./routers/salesRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('o');
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);