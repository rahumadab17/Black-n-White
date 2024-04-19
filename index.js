const express = require('express');
const fs = require('fs');
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid')

const app = express();
const port = 3000;

app.listen(port, console.log(`Servidor inicializado escuchando en puerto ${port}`));

app.use(express.static("assets"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get("/blackandwhitephoto", async (req, res) => {
    const { url } = req.query;

    let uuidCompleto = uuidv4();

    let uuidPorcion = uuidCompleto.slice(0, 6);

    const imagen = await Jimp.read(url);
    await imagen 
            .resize(350, Jimp.AUTO)
            .greyscale()
            .writeAsync(`${uuidPorcion}.jpeg`)
            
            const imagenData = fs.readFileSync(`${uuidPorcion}.jpeg`);
            res.send(imagenData)
});