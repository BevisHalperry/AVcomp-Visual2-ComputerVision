var video;
var backImage;
var difference;
var counter = 0;

function setup() {
    createCanvas(640 * 2, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    background(0);
    image(video, 0, 0);

    difference = createImage(video.width, video.height);
    difference.loadPixels();

    //console.log("HERE:", backImage);
    if (typeof backImage !== 'undefined') {
        backImage.loadPixels();
        difference.loadPixels();
        video.loadPixels();
        for (var x = 0; x < video.width; x += 1) {
            for (var y = 0; y < video.height; y += 1) {
                var index = (x + (y * video.width)) * 4;
                var redSource = video.pixels[index + 0];
                var greenSource = video.pixels[index + 1];
                var blueSource = video.pixels[index + 2];

                var redBackground = backImage.pixels[index + 0];
                var greenBackground = backImage.pixels[index + 1];
                var blueBackground = backImage.pixels[index + 2];

                var d = dist(redSource, greenSource, blueSource, redBackground, greenBackground, blueBackground);

                if (d > 50) {
                    difference.pixels[index + 0] = redSource;
                    difference.pixels[index + 1] = greenSource;
                    difference.pixels[index + 2] = blueSource;
                    difference.pixels[index + 3] = 255;
                    counter++;
                } else {
                    difference.pixels[index + 0] = 0;
                    difference.pixels[index + 1] = 255;
                    difference.pixels[index + 2] = 0;
                    difference.pixels[index + 3] = 255;
                }
            }
        }
    }


    difference.updatePixels();
    image(difference, 640, 0);
}

function mousePressed() {
    backImage = get(0, 0, video.width, video.height); //copy(0, 0, video.width, video.height, 0, 0, backImage.width, backImage.height);
    console.log("saved new background");
}
