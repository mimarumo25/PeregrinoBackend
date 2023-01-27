import express from "express";
import morgan from "morgan";
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import { createEstadoMatricuala, createRoles, createEstado, createTipoSalida } from "./libs/initialSetup.js";
import userRouter from './routes/user.routes.js'
import estadosRoutes from './routes/estados.routes.js'
import reclusoRouter from './routes/recluso.routes.js'
import programasRouter from './routes/programas.routes.js'
import leccionesRouter from './routes/lecciones.routes.js'
import matriculaRouter from './routes/mantricula.routes.js'
import busquedaRouter from './routes/busqueda.routes.js'
import SalidaReclusoRouter from './routes/salidaRecluso.routes.js'
import totalesRouter from './routes/totales.routes.js'
import fileRouter from './routes/files.routes.js'

const app = express();

const whiteList = [process.env.ORIGIN, process.env.ORIGIN2]
app.use(cors(/*{
    origin: function (origin, collback) {
        if (whiteList.includes(origin)) {
            return collback(null, origin)
        }
        return collback("Error de CORS origin: "+ origin+ " No autorizado")
    }
}*/));
createRoles();
createEstado();
createEstadoMatricuala();
createTipoSalida();



app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req, res) => {
res.json({"Nombre":"Peregrino - APP"})
})
app.use('/api/users', userRouter)
app.use('/api/auth', authRoutes)
app.use('/api/estado', estadosRoutes)
app.use('/api/recluso', reclusoRouter)
app.use('/api/programa', programasRouter)
app.use('/api/lecciones', leccionesRouter)
app.use('/api/matriculas', matriculaRouter)
app.use('/api/coleccion', busquedaRouter)
app.use('/api/salidaReclusos', SalidaReclusoRouter)
app.use('/api/totales', totalesRouter)
app.use('/api/files', fileRouter)

export default app;