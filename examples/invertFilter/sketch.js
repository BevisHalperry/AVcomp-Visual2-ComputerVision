var imgIn;
var imgOut;

function preload() {
    imgIn = loadImage("assets/medusae.png");
    pixelDensity(1);
}

function setup() {
    createCanvas((imgIn.width * 2) + 20, imgIn.height);
    imgOut = createImage(imgIn.width, imgIn.height);
}

function draw() {
    background(255);

    imgOut.loadPixels();
    imgIn.loadPixels();

    for (i = 0; i < imgOut.width; i++) {
        for (j = 0; j < imgOut.height; j++) {

            var index = (i + j * imgOut.width) * 4;

            var r = 255 - imgIn.pixels[index + 0];
            var g = 255 - imgIn.pixels[index + 1];
            var b = 255 - imgIn.pixels[index + 2];

            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    image(imgOut, 0, 0);
    image(imgIn, imgIn.width + 20, 0);
}
