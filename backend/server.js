const express = require('express');
const cors = require('cors');
const db = require('./dbconfig');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/filmes', (req, res) => {
	db.query(
		'SELECT id, titulo, genero, ano, nota FROM filmes',
		(error, filmes) => {
			if (error) {
				console.error('Erro ao buscar filmes:', error.message);
				return res.status(500).json({ erro: 'Não foi possível buscar os filmes.' });
			}

			res.json(filmes);
		}
	);
});

app.listen(port, () => {
	console.log(`Servidor backend executando na porta ${port}`);
});
