var imgIn;
var imgOut;

//blur
// var matrix = [
//     [1 / 9, 1 / 9, 1 / 9],
//     [1 / 9, 1 / 9, 1 / 9],
//     [1 / 9, 1 / 9, 1 / 9]
// ];

// gaussian blur
// var matrix = [
//     [1/16, 2/16, 1/16],
//     [2/16, 4/16, 2/16],
//     [1/16, 2/16, 1/16]
// ];

// sharpen
var matrix = [[ -1, -1, -1 ],
              [ -1,  9, -1 ],
              [-1, -1, -1 ]];


function preload() {
    imgIn = loadImage("assets/medusae.png");
}

function setup() {
    createCanvas((imgIn.width * 2) + 20, imgIn.height);
    pixelDensity(1);
    imgOut = createImage(imgIn.width, imgIn.height);
}

function draw() {
    background(255);
    var matrixsize = 3;

    imgOut.loadPixels();
    imgIn.loadPixels();

    for (i = 0; i < imgOut.width; i++) {
        for (j = 0; j < imgOut.height; j++) {

            var index = (i + j * imgOut.width) * 4;

            var r = imgIn.pixels[index + 0];
            var g = imgIn.pixels[index + 1];
            var b = imgIn.pixels[index + 2];

            var c = convolution(i, j, matrix, matrixsize, imgIn);

            imgOut.pixels[index + 0] = red(c);
            imgOut.pixels[index + 1] = green(c);
            imgOut.pixels[index + 2] = blue(c);
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    image(imgIn, 0, 0);
    image(imgOut, imgIn.width + 20, 0);
    noLoop();
}

function convolution(x, y, matrix, matrixsize, img) {
    var rtotal = 0.0;
    var gtotal = 0.0;
    var btotal = 0.0;
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
            rtotal += img.pixels[loc + 0] * matrix[i][j];
            gtotal += img.pixels[loc + 1] * matrix[i][j];
            btotal += img.pixels[loc + 2] * matrix[i][j];
        }
    }
    // Make sure RGB is within range
    rtotal = constrain(rtotal, 0, 255);
    gtotal = constrain(gtotal, 0, 255);
    btotal = constrain(btotal, 0, 255);
    // Return the resulting color
    return color(rtotal, gtotal, btotal);
}
