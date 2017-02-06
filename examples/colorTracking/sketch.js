var video;
var target; // A variable for the color we are searching for.

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
    noStroke();

    target = new TargetColor(color(255,0,0)); // Start off tracking for red
}

function draw() {
    background(0);
    image(video, 0, 0);
    video.loadPixels();

    // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
    var worldRecord = 500;

    // XY coordinate of closest color
    var closestX = 0;
    var closestY = 0;

    for (var x = 0; x < video.width; x += 1) {
        for (var y = 0; y < video.height; y += 1) {
            var index = (x + (y * video.width)) * 4;
            var redSource = video.pixels[index + 0];
            var greenSource = video.pixels[index + 1];
            var blueSource = video.pixels[index + 2];

            var d = dist(redSource, greenSource, blueSource, target.red, target.green, target.blue);

            if (d < worldRecord) {
                worldRecord = d;
                closestX = x;
                closestY = y;
            }
        }
    }

    // We only consider the color found if its color distance is less than 10.
    // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
    if (worldRecord < 10) {
        // Draw a circle at the tracked pixel
        fill(target.rgb);
        strokeWeight(4);
        stroke(0);
        ellipse(closestX, closestY, 16, 16);
    }
}

function mousePressed() {
    // Save color where the mouse is clicked in target variable
    target = new TargetColor(video.get(mouseX, mouseY));

}

function TargetColor(_color){
   this.rgb = _color;
   this.red = red(_color);
   this.green = green(_color);
   this.blue = blue(_color);
}
