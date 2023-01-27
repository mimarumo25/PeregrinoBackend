import pkg from 'mongoose';
const { Schema, model } = pkg;


const leccionesSchema = new Schema({
    nombre: String,
    programa: [
        {
            ref: "Programa",
            type: Schema.Types.ObjectId //Relaciona con la tabla Estado toma el id 
        }
    ],
    nivel: {
        type: Number,
        unique: true
    },
    descripcion: String,
}, {
    timestamps: true,
    versionKey: false
})

export default model("Lecciones", leccionesSchema)