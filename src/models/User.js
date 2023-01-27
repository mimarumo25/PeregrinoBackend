import pkg from 'mongoose';
import bcrypt from "bcryptjs";
const { Schema, model } = pkg;
const userSchima = new Schema({
    identifica: {
        type: String,
        unique: true
    },
    nombres: {
        type: String
    },
    apellidos: {
        type: String
    },
    telefono: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: [
        {
            ref: "Estado",
            type: Schema.Types.ObjectId //Relaciona con la tabla Estado toma el id 
        }
    ],
    roles: [
        {
            ref: "Role",
            type: Schema.Types.ObjectId //Relaciona con la tabla Roles toma el id 
        }
    ]
},
    {
        timestamps: true,
        versionKey: false
    }
)

//Encriptar password
userSchima.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchima.statics.comparePasword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}



export default model("User", userSchima);