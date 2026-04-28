import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index.js';
import 'dotenv/config'

const PORT = process.env.PORT;
const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: ["http://localhost:5173"]
}))

app.use("/api",router)

app.listen(3000, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})