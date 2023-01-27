import pkg from 'mongoose';
const { Schema, model } = pkg;

export const Estado =['En Curso','Finalizado']
const estadoMatriculaSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model("EstadoMatricula", estadoMatriculaSchema)