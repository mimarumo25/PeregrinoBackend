import pkg from 'mongoose';
const { Schema, model } = pkg;
export const Roles =['user','admin','moderator']

const rolesSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model("Role", rolesSchema)