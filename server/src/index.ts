import express from 'express';

import BrandsRouter from './handlers/hotel-brands/handler';
import RootRouter from './handlers/root/handler';
import { defaultErrorResponse, logErrors } from './middlewares/error-handler';
import cors from 'cors';

const app = express();
const port = process.env.PORT || '8000';

app.use(cors());
app.use(express.json());

app.use('/', RootRouter);

app.use('/hotel-brands', BrandsRouter);

app.use(logErrors);
app.use(defaultErrorResponse);
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
