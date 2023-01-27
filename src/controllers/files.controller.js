import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })
export const uploaded = upload.single("/myFiles")


export const getFiles = async (req, res) => {

    res.json({ Mensajes: "Ready for Files" })
}
export const upFiles = async (req, res) => {

    if (req.files) {
        const resp = await guardarArchivo(req.files, "documentoPdf", "pdf")
        if (resp.isOk) {
            res.json({ isOk: resp.isOk })
        } else {
            res.json({ error: resp.error })
        }
    } else {
        res.json({ Error: "Debe adjuntar el Archivo en la petición" })
    }
}