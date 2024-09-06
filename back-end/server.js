const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Configuração do banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS gastos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, preco REAL, descricao TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS entradas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, valor REAL)");
});

// Função para executar uma query com tratamento de erros
function runQuery(query, params, successMessage, res) {
    db.run(query, params, function (err) {
        if (err) {
            res.status(500).send({ status: 'Erro', message: err.message });
        } else {
            res.send({ status: successMessage });
        }
    });
}

// Rota para adicionar gasto
app.post('/add-gasto', (req, res) => {
    const { nome, preco, descricao } = req.body;
    const stmt = db.prepare("INSERT INTO gastos (nome, preco, descricao) VALUES (?, ?, ?)");
    stmt.run(nome, preco, descricao, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send({ status: 'Erro ao adicionar gasto.' });
        } else {
            res.send({ status: 'Gasto adicionado com sucesso!' });
        }
    });
    stmt.finalize();
});

// Rota para adicionar entrada
app.post('/add-entrada', (req, res) => {
    const { nome, valor } = req.body;
    const stmt = db.prepare("INSERT INTO entradas (nome, valor) VALUES (?, ?)");
    stmt.run(nome, valor, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send({ status: 'Erro ao adicionar entrada.' });
        } else {
            res.send({ status: 'Entrada adicionada com sucesso!' });
        }
    });
    stmt.finalize();
});

// Rota para remover gasto
app.post('/remove-gasto', (req, res) => {
    const { nome } = req.body;
    runQuery("DELETE FROM gastos WHERE nome = ?", [nome], 'Gasto removido com sucesso!', res);
});

// Rota para buscar todos os gastos
app.get('/gastos', (req, res) => {
    db.all("SELECT * FROM gastos", [], (err, rows) => {
        if (err) {
            res.status(500).send({ status: 'Erro', message: err.message });
        } else {
            res.json(rows); // Retorna os dados de gastos
        }
    });
});

// Rota para buscar todas as entradas
app.get('/entradas', (req, res) => {
    db.all("SELECT * FROM entradas", [], (err, rows) => {
        if (err) {
            res.status(500).send({ status: 'Erro', message: err.message });
        } else {
            res.json(rows); // Retorna os dados de entradas
        }
    });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechar a conexão com o banco de dados quando o servidor for encerrado
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados fechada.');
        }
        process.exit(0);
    });
});
