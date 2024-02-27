let red;
let blue;
let black;
let riso_filters = [];
let img, texto;
let ditherType = 'atkinson';
let dist = .47;
let orden = [0, 1, 2, 3, 4, 5, 6, 7];
let inicio, fin;
let nIteraciones = 8;

function preload() {
    img = loadImage('main.png');
    texto = loadImage('texto.png');
}

function setup() {
    pixelDensity(1);
    createCanvas(1080, 566);

    riso_filters = new Array(8);

    black = new Riso('black');
    riso_filters[1] = new Riso('red');
    riso_filters[2] = new Riso('yellow');
    riso_filters[3] = new Riso('green');
    riso_filters[7] = new Riso('blue');
    riso_filters[0] = new Riso('violet');
    riso_filters[4] = new Riso('moss');
    riso_filters[5] = new Riso('seafoam');
    riso_filters[6] = new Riso('tomato');

    inicio = 0;
    fin = inicio + 4;
    console.log(orden);
    for (let i = 0; i < nIteraciones; i++) {
        let aux = orden;
        for (let i = 0; i < orden.length; i++) {
            orden[i] < 4 ? aux[i] = orden[i] - 1 : aux[i] = orden[i] + 1;
            if (orden[i] < 0) aux[i] = 4;
            if (orden[i] > 7) aux[i] = 3;
        }
        console.log(orden)
    }

    noLoop();
}

function draw() {
    background(255);

    clearRiso();

    let dithered = ditherImage(img, ditherType, 5);
    let dithered_t = ditherImage(texto, ditherType, 127);
    black.fill(255);
    black.image(dithered, 428, 52, 600, 462);
    black.image(dithered_t, 52, 52, 324, 462);

    for (let i = 0; i < riso_filters.length; i++) {
        riso_filters[i].fill(180);
        riso_filters[i].noStroke();
        if (i < 4) {
            riso_filters[i].triangle(428, 52, 428 + ((i + 1) * 150), 514, 428 + (i * 150), 514);
        }
        else {
            riso_filters[i].triangle(428, 52, 1028, 52 + ((i - 3) * 115.5), 1028, 52 + ((i - 4) * 115.5));
        }
    }

    drawRiso();
}

function mouseClicked() {
    // exportRiso();
}

function printOrden() {
    console.log("----------------------");
    for (let i = 0; i < orden.length; i++) {
        console.log(i);
    }
}