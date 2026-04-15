const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/motos');

const Agendamento = mongoose.model('Agendamento', {
  nome: String,
  telefone: String,
  servico: String,
  data: String,
  hora: String
});

app.post('/agendar', async (req, res) => {
  const { data, hora } = req.body;

  const existe = await Agendamento.findOne({ data, hora });
  if (existe) return res.status(400).send('Horário ocupado');

  const novo = await Agendamento.create(req.body);
  res.send(novo);
});

app.get('/agendamentos', async (req, res) => {
  const lista = await Agendamento.find();
  res.send(lista);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
