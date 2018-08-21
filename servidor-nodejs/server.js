const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require("socket.io");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



const server = http.createServer(app);
const io = socketIO(server);

let numeroSorteado = getRandomIntInclusive(1, 100);
let participantes = [];
let inicio = 0;
let fim = 100;
let ultimoValor;
io.on('connection', (socket) => {

    console.log("novo usuario conectado");
    console.log(numeroSorteado);



    socket.on('disconnect', (msg) => {

        console.log("usuario desconectado: " + socket.id);
        participantes = participantes.filter(function (el) {
            return (el.id !== socket.id);
        });
        io.to('grupo_partic').emit('addPart', participantes);

    });


    socket.on('addPart', (msg) => {

        participantes.push({ id: socket.id, nome: msg.participante, pontos: 0 })
        socket.join('grupo_partic');
        io.to('grupo_partic').emit('addPart', participantes);
        io.to('grupo_partic').emit('proximaTentativa', { "minimo": inicio, "maximo": fim });

    })


    socket.on('tentativa', (num) => {
        // console.log(num);
        console.log('Nº sorteado: ' + numeroSorteado);
        if (num < 0 || num > 100) {
            console.log("valor invalido");
        } else {
            if (numeroSorteado == num) {

                numeroSorteado = getRandomIntInclusive(inicio, fim);
                inicio = 0;
                fim = 100;

                for (let i in participantes) {
                    if (participantes[i].id == socket.id) {
                        participantes[i].pontos = participantes[i].pontos + 1;
                    }
                }

                let ganhador = participantes.filter(function (el) {
                    return (el.id == socket.id);
                });

                console.log(participantes)
                //    console.log(ganhador.pontos++)
                io.to('grupo_partic').emit('finalRodada', participantes, ganhador, num, { "minimo": inicio, "maximo": fim });

                console.log("novo numero agora é: " + numeroSorteado);
            }
            else {
                console.log("Entrou aqui")
                if (num <= fim && num > numeroSorteado) {

                    fim = num;


                } else if (num >= inicio && num < numeroSorteado) {

                    inicio = num;

                }

                io.to('grupo_partic').emit('proximaTentativa', { "minimo": inicio, "maximo": fim });
            }



        }





    })

})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


server.listen(port, () => {
    console.log("servidor node ligado na port 3000");
})