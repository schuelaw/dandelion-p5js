// by Albert Schueller, math prof at Whitman College
// license: creative commons, BY-SA

var canvas;
var balls;
var colors;
var slider;
var dt;
var l;

function setup() {
 // put setup code here
 canvas=createCanvas(600,600);
 canvas.position(0,0);
 canvas.parent('dandelion');
 ellipseMode(RADIUS);
 //frameRate(10);
 // loop/noloop toggle boolean, start with l=true
 l=true;
 dt = 0.0001
 balls = [];
 numBalls = 102;
 colors = [ color(255,0,0,128), color(0,255,0,128), color(0,0,255,128)];
 for(var i=0;i<numBalls;i++) {
   balls.push(new Ball(125,TWO_PI/numBalls*i, 25+i, colors[i%3], 3));
 }

 slider = createSlider(-100,100,50);
 slider.position(20,35);

}

function draw() {
 dt = slider.value()/100000.0;
 fill(255);
 stroke(0);
 rect(0,0,width-1,height-1);
 // Speed control label
 fill(0);
 noStroke();
 text("Speed:",20,20);

 translate(width/2,height/2);
 fill(255);
 stroke(0);
 strokeWeight(2);
 for(var i=0;i<numBalls-1;i++) {
   stroke(colors[i%3]);
   line( balls[i].xpos,balls[i].ypos, balls[i+1].xpos,balls[i+1].ypos);
 }

 for(var i=0;i<numBalls;i++) {
   balls[i].display();
   balls[i].update();
 }

 translate(-width/2,-height/2);
}

// loop/noloop spacebar toggle
function keyTyped() {
 // spacebar toggles looping
 if (key == " ") {
  l = !l;
  if (l) { loop(); }
  else {noLoop(); }
 }
}

// A class that represents a ball on a circle of radius _R, at angle, _a,
// moving in and out at frequency, _freq, with color, _c, radius, _r
//

var Ball = function(_R, _a, _freq, _c, _r) {

  // Initial time, time step
  this.t = 0;

  // Input parameters
  this.R = _R;
  this.angle = _a;
  this.freq = _freq;
  this.color = _c;
  this.r = _r;

  // initial position
  this.xpos = this.R*(1+sin(this.freq*this.t))*cos(this.angle);
  this.ypos = this.R*(1+sin(this.freq*this.t))*sin(this.angle);
};

// Method to update position
Ball.prototype.update = function(){

 // timestep
 this.t += dt;

 // update position
 this.xpos = this.R*(1+sin(this.freq*this.t))*cos(this.angle);
 this.ypos = this.R*(1+sin(this.freq*this.t))*sin(this.angle);
};

// Method to display
Ball.prototype.display = function() {
  fill(this.color);
  stroke(0);
  strokeWeight(1);
  ellipse(this.xpos,this.ypos,this.r,this.r);
};




