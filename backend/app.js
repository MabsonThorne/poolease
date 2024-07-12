const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const poolTablesRouter = require('./routes/poolTables');
const mahjongTablesRouter = require('./routes/mahjongTables');
const membersRouter = require('./routes/members');
const employeesRouter = require('./routes/employees');
const uploadRouter = require('./routes/upload');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productsRouter);
app.use('/api/pool-tables', poolTablesRouter);
app.use('/api/mahjong-tables', mahjongTablesRouter);
app.use('/api/members', membersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
