const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
