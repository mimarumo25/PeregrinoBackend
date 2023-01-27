const guardarArchivo = async(files,nombreArchivo,tipoArchivo) => {
    const archivo = files[nombreArchivo];
    console.log(archivo);
    const resp ={isOk:false,error:null,nuevoNombre:null}
    if(files.mimetype=="application/pdf"){
        resp.isOk=true;
        return resp
    }else{
        resp.error ="El archivo no es formato PDF"
        return resp
    }
}

export default guardarArchivo;