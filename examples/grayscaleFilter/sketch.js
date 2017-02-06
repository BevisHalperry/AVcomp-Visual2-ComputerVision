var imgIn;
var imgOut;

function preload() {
    imgIn = loadImage("assets/medusae.png");
    pixelDensity(1);
}

function setup() {
    createCanvas((imgIn.width * 2)+20, imgIn.height);
    imgOut = createImage(imgIn.width, imgIn.height);
}

function draw() {
    background(255);

    imgOut.loadPixels();
    imgIn.loadPixels();

    for (i = 0; i < imgOut.width; i++) {
      for (j = 0; j < imgOut.height; j++) {

        var index = (i + j*imgOut.width)*4;

        var r = imgIn.pixels[index+0];
        var g = imgIn.pixels[index+1];
        var b = imgIn.pixels[index+2];

        var gray = (r + g + b) / 3; // simple
        // var gray = 0.2126 * r + 0.7152 * g + 0.0722 * b; // CIE luminance ratios

        imgOut.pixels[index+0]= imgOut.pixels[index+1] = imgOut.pixels[index+2] = gray;
        imgOut.pixels[index+3]= 255;
      }
    }
    imgOut.updatePixels();
    image(imgOut, 0, 0);
    image(imgIn, imgIn.width+20, 0);
}
