var imgIn;
var imgOut;

// edge detect horizontal
var matrixX = [ [-1, -2, -1],
                [0, 0, 0],
                [1, 2, 1] ];

//edge detect vertical
var matrixY = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

function preload() {
    imgIn = loadImage("assets/medusae.png");
}

function setup() {
    createCanvas((imgIn.width * 2) + 20, imgIn.height);
    imgIn.filter(GRAY);
    pixelDensity(1);
    imgOut = createImage(imgIn.width, imgIn.height);
}

function draw() {
    background(255);
    var matrixsize = 3;

    imgOut.loadPixels();
    imgIn.loadPixels();

    for (var x = 0; x < imgOut.width; x++) {
        for (var y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;

            var vX = convolution(x, y, matrixX, matrixsize, imgIn);
            var vY = convolution(x, y, matrixY, matrixsize, imgIn);
            var combo = constrain(vX+vY,0,255);

            imgOut.pixels[index + 0] = combo;
            imgOut.pixels[index + 1] = combo;
            imgOut.pixels[index + 2] = combo;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    image(imgIn, 0, 0);
    image(imgOut, imgIn.width + 20, 0);
    noLoop();
}

function convolution(x, y, matrix, matrixsize, img) {
    var total = 0.0;
    var offset = floor(matrixsize / 2);

    //Loop through convolution matrix
    for (var i = 0; i < matrixsize; i++) {
        for (var j = 0; j < matrixsize; j++) {
            // What pixel are we testing
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var loc = (xloc + img.width * yloc) * 4;
            // Make sure we have not walked off the edge of the pixel array
            loc = constrain(loc, 0, img.pixels.length - 1);
            // Calculate the convolution
            // We sum all the neighboring pixels multiplied by the values in the convolution matrix.
            total += img.pixels[loc + 0] * matrix[i][j];
        }
    }
    // Make sure RGB is within range
    total = constrain(total, 0, 255);

    // Return the resulting color
    return total;
}
