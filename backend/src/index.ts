import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import linkRoutes from './routes/linkRoutes'

const app = express();

const PORT = parseInt(process.env.PORT || '4000', 10);
const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});