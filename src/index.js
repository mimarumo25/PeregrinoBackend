import app from './app.js'
import './database.js'

app.listen(process.env.PORT || 4001);

console.log(`Server Escuchando en el puerto: ${process.env.PORT || 4001} : ${process.env.environment}${process.env.PORT || 4001}`)
