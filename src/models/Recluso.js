import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const reclusoSchema = new Schema({
    cedula: {
        type: String,
        unique: true
    },
    nombres: String,
    apellidos: String,
    nit: {
        type: Number,
        unique: true
    },
    celda: String,
    patio: String,
    estado: [
        {
            ref: "Estado",
            type: Schema.Types.ObjectId //Relaciona con la tabla Estado toma el id 
        }
    ]
},
    {
        timestamps: true,
        versionKey: false
    })
export default models.Recluso || model("Recluso", reclusoSchema)