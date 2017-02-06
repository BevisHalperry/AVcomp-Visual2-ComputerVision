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

            var r = imgIn.pixels[index + 0];
            var g = imgIn.pixels[index + 1];
            var b = imgIn.pixels[index + 2];

            var threshold = 125;
            // var bright = (r + g + b) / 3; // simple
            var bright = 0.2126 * r + 0.7152 * g + 0.0722 * b; // CIE luminance ratios

            if (bright > threshold) {
                imgOut.pixels[index + 0] = 255;
                imgOut.pixels[index + 1] = 255;
                imgOut.pixels[index + 2] = 255;
                imgOut.pixels[index + 3] = 255;
            } else {
                imgOut.pixels[index + 0] = 0;
                imgOut.pixels[index + 1] = 0;
                imgOut.pixels[index + 2] = 0;
                imgOut.pixels[index + 3] = 255;
            }
        }
    }
    imgOut.updatePixels();
    image(imgIn, 0, 0);
    image(imgOut, imgIn.width + 20, 0);
}
