import pkg from 'mongoose';
const { Schema, model } = pkg;


const programasSchema = new Schema({
    nombre: String,
    descripcion: String,
}, {
    timestamps: true,
    versionKey: false
})

export default model("Programa", programasSchema)