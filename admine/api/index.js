import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// routes
app.use('/api', routes);


// error handler (harus di bawah routes)
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
