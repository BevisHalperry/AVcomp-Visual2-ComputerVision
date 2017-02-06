var video;
var Target= []; // A variable for the color we are searching for.

var threshold = 25;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
    noStroke();

    // Target[i] = new Target[i]Color(color(255,0,0)); // Start off tracking for red
}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(0);
    noStroke();
    textSize(18);
    text("Threshold:"+ threshold, 10,20);
    for (var i = 0; i < Target.length; i++) {
    text("color " + i + ": " + Target[i].red + ", " + Target[i].green + ", " + Target[i].blue, 10, 40 + i * 25);
    }
    video.loadPixels();

    // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
    var worldRecord = 500;

    // XY coordinate of closest color
    var closestX = 0;
    var closestY = 0;

  for (var i=0; i<Target.length; i++){
    for (var x = 0; x < video.width; x += 3) {
        for (var y = 0; y < video.height; y += 3) {
            var index = (x + (y * video.width)) * 4;
            var redSource = video.pixels[index + 0];
            var greenSource = video.pixels[index + 1];
            var blueSource = video.pixels[index + 2];

            var d = dist(redSource, greenSource, blueSource, Target[i].red, Target[i].green, Target[i].blue);

            if (d < threshold) {
                worldRecord = d;
                closestX = x;
                closestY = y;
                Target[i].avgX += x;
                Target[i].avgY += y;
                Target[i].count ++ ;
            }
        }
    }

    // We only consider the color found if its color distance is less than 10.
    // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
    if (Target[i].count > 0) {
        Target.arrayPosition = i;
        // Draw a circle at the tracked pixel
        Target[i].avgX = (Target[i].avgX)/Target[i].count;
        Target[i].avgY = (Target[i].avgY)/Target[i].count;
        fill(Target[i].rgb);
        strokeWeight(4);
        stroke(0);
        ellipse(Target[i].avgX,Target[i].avgY, 16, 16);
        fill(0);
        strokeWeight(0);
        textSize(16);
        text(Target.arrayPosition, Target[i].avgX+8 ,Target[i].avgY+8);
        console.log(Target.arrayPosition);
    }

    Target[i].reset();
  }
}

function mousePressed() {
    // Save color where the mouse is clicked in target variable
    Target.push(new TargetColor(video.get(mouseX, mouseY)));

}

function TargetColor(_color){
   this.avgX = 0;
   this.avgY =0;
   this.count = 0;
   this.arrayPosition;

   this.rgb = _color;
   this.red = red(_color);
   this.green = green(_color);
   this.blue = blue(_color);

   this.reset = function(){
     this.avgX = 0;
     this.avgY = 0;
     this.count = 0;
   }


}

function keyTyped(){
  if (key === 'i'){
    threshold += 2.5;
  }
  else if (key === 'd'){
    threshold -= 2.5;
  }
  else if(key === 'r'){
    Target = [];
  }
  return false;
}
