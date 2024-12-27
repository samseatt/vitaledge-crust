import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Error Handling
app.use(errorHandler);

export default app;
