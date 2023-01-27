import pkg from 'mongoose';
const { Schema, model } = pkg;

const matriculaSchema = new Schema({
    recluso: [
        {
            ref: "Recluso",
            type: Schema.Types.ObjectId //Relaciona con la tabla Estado toma el id 
        }
    ],
    leccion: [
        {
            ref: "Lecciones",
            type: Schema.Types.ObjectId 
        }
    ],
    estado: [
        {
            ref: "EstadoMatricula",
            type: Schema.Types.ObjectId 
        }
    ],
}, {
    timestamps: true,
    versionKey: false
})

export default model('Matricula',matriculaSchema);