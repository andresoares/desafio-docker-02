const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlTableExists = `SELECT count(*) as bla FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'nodedb') AND (TABLE_NAME = 'people')`;
const sqlTableCreateTable = `CREATE TABLE people (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255)
)`;
const sqlInsert = `INSERT INTO people(name) values('Andre')`

connection.query(sqlTableExists, function(err, result, fields){
    if(result[0].bla == 0 ){
        connection.query(sqlTableCreateTable, function(err, result, fields){
            connection.query(sqlInsert);
            connection.end();
        });
    } else {
        connection.query(sqlInsert);
        connection.end();
    }
});

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    const resp = connection.query(`SELECT * FROM people`, function(err, result, fields){
        let nomes = '<ul>';
        result.forEach(element => {
            nomes += `<li>${element.name}</li>`
        });
        nomes += '</ul>';
        res.send(`<h1>Full Cycle Rocks!</h1><br>${nomes}`);
    });
    connection.end();
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})