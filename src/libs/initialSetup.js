import Estado from "../models/Estado.js";
import EstadoMatricula from "../models/EstadoMatricula.js";
import Role from "../models/Role.js";
import TipoSalida from "../models/TipoSalida.js";

export const createRoles = async () => {
    try {
        const cout = await Role.estimatedDocumentCount();
        if (cout > 0) return;
        const roleSave = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ])
        console.log(roleSave);
    }
    catch (error) {
        console.error(error);
    }
}
export const createEstado = async () => {
    try {
        const cout = await Estado.estimatedDocumentCount();
        if (cout > 0) return;
        const estadoSave = await Promise.all([
            new Estado({ name: 'activo' }).save(),
            new Estado({ name: 'inactivo' }).save(),
            
        ])
        console.log(estadoSave);
    }
    catch (error) {
        console.error(error);
    }
}
export const createEstadoMatricuala = async () => {
    try {
        const cout = await EstadoMatricula.estimatedDocumentCount();
        if (cout > 0) return;
        const estadoSave = await Promise.all([
            new EstadoMatricula({ name: 'En Curso' }).save(),
            new EstadoMatricula({ name: 'Finalizado' }).save(),
            
        ])
        console.log(estadoSave);
    }
    catch (error) {
        console.error(error);
    }
}
export const createTipoSalida = async () => {
    try {
        const cout = await TipoSalida.estimatedDocumentCount();
        if (cout > 0) return;
        const tipoSalidaSave = await Promise.all([
            new TipoSalida({ name: 'Salida Domiciliaria' }).save(),
            new TipoSalida({ name: 'Salida Parcial' }).save(),
            
        ])
        console.log(tipoSalidaSave);
    }
    catch (error) {
        console.error(error);
    }
}