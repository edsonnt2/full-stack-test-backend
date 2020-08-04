import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

const PORT = 5000;
app.listen(PORT, () => console.log(`Node conected in Port ${PORT}`));
