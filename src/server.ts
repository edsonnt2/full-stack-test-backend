import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Node conected in Port ${PORT}`));
