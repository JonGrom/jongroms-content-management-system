const express = require('express');
const { Pool } = require('pg')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
        user: '',
        password: '',
        host: 'localhost',
        database: 'employees_db'
    },
    console.log('Connected to database')
)


pool.connect()

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

