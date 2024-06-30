//index.js
import express from 'express';
import cors from 'cors';
import router from './src/routes/joyasRoutes.js';
import reportMiddleware  from './src/middlewares/reportMiddleware.js';
import dotenv from 'dotenv';
import morgan from 'morgan'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar informes
app.use(reportMiddleware);

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
});