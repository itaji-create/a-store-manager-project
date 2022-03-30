const express = require('express');

const app = express();

const productsRouter = require('./routers/productsRouter');

require('dotenv').config();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('o');
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use('/products', productsRouter);