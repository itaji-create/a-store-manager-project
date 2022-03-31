const express = require('express');

const app = express();

const ProductsRouter = require('./routers/productsRouter');
const SalesRouter = require('./routers/salesRouter');

require('dotenv').config();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('o');
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);