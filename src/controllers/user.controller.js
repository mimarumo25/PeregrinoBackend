import User from "../models/User.js"
import Role from "../models/Role.js";
import Estado from "../models/Estado.js";

export const createUser = async (req, res) => {
  try {
    const { identifica, nombres, apellidos, telefono, email, password, roles } = req.body;
    const newUser = new User({
      identifica,
      nombres,
      apellidos,
      telefono,
      email,
      password: await User.encryptPassword(password)
    })
    //validamos si se envio los roles y consultamos si exite y carga todos los roles al nuevo usuario
    if (roles) {
      const fountRoles = await Role.find({ name: { $in: roles } })
      newUser.roles = fountRoles.map(role => role._id)
    }//si no se envia un rol por defecto carga el rol de user
    else {
      const role = await Role.findOne({ name: "moderator" })
      newUser.roles = [role._id]
    }
    const estado = await Estado.findOne({ name: "activo" })
    newUser.estado = [estado._id]
    const saveUser = await newUser.save();

    /*const token = jwt.sign({ id: saveUser.id }, config.SECRET, {
      expiresIn: 86400 // expria en 24 horas
    })*/
    res.status(201).json({ mesage: "usuario creado exitosamente" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" })
  }
}

export const getUsers = async (req, res) => {

  const desde = Number(req.query.desde) || 0;

  try {
    const users = await User.find({}, { 'password': 0, 'token': 0 })
      .populate("roles")
      .populate("estado")
      .skip(desde)
      .limit(50);

    const total = await User.countDocuments();

    res.json({
      ok: true,
      usuarios: users,
      total
    })
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500).json({ mensaje: "error al recuperar el usuario" })
  }


}
export const getUserById = async (req, res) => {
  try {
    const userId = await User.findById(req.params.userId, { 'password': 0 }).populate("roles").populate("estado")
    res.json(userId);
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500).json({ mensaje: "error al Actualizar el usuario" })
  }

}
export const updateUserById = async (req, res) => {
  const { identifica, nombres, apellidos, telefono, email, roles } = req.body;
  const fountRoles = await Role.find({ name: { $in: roles } })
  const role = fountRoles.map(role => role._id)
  await User.findByIdAndUpdate(req.params.userId, { identifica,nombres, apellidos, telefono, email, roles: role }, { new: true })
  res.json({ mensaje: "Usuario Actualizado Exitosamente" });
}
export const updateUserDatosById = async (req, res) => {
  try {
    const { nombres, apellidos, telefono, email } = req.body;
    await User.findByIdAndUpdate(req.params.userId, { nombres, apellidos, telefono, email }, { new: true })
    res.json({ mensaje: "Datos de Usuario Actualizado Exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor al actualizar los datos" });
  }

}

export const updateUserPassById = async (req, res) => {
 
  try {    
    const password = await User.encryptPassword(req.body.password)
    await User.findByIdAndUpdate(req.params.userId, { password }, { new: true })
    res.json({ mensaje:"Password de Usuario Actualizado Exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor al actualizar Su Password" });
  }

}
export const deleteUserById = async (req, res) => {
  try {
     
    const deleteId = await User.findByIdAndDelete(req.params.userId)
    if (!deleteId) return res.status(401).json({ mensaje: "El Usuario no existe" })
    return res.json({ mensaje: "Usuario Eliminado Correctamente " })
} catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al Eliminar el Usuario" })
}
}

