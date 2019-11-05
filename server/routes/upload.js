const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload', function(req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: 'false',
            message: 'No se ha seleccionado ningún archivo.'
        });
    }

    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length - 1]

    // Validar extension
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El archivo no es una imagen.'
            }
        });
    }



    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${archivo.name}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        }

        return res.json({
            ok: true,
            message: 'Imagen subida exitosamente'
        });
    });
});

module.exports = app;