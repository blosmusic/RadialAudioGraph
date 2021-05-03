//Ben Lamb O'Sullivan - hi@benlambosullivan.com
//Radial Audio Graph using amplitude reading.
//Based on The Coding Train tutorial
//https://youtu.be/h_aTgOl9J5I
//======================================================
let song;
let amp;
let button;
let canvas;

let volHistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('DrumsInfront.mp3');
}

function setup() {
  canvas = createCanvas(1200, 1800);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();

  // let songDur = song.duration;
}

function draw() {
  background(0);
  let vol = amp.getLevel();
  volHistory.push(vol);
  stroke('#00ff9f');
  fill('#00ff9f');
  // console.print('Song Duration is: ' + songDur);

  //text parameters
  textAlign(CENTER, CENTER);
  textSize(75);
  text('Track Name', width / 2, 150);
  // textSize(50);
  text('Artist Name', width / 2, height - 150);

  //frame parameters
  noFill();
  rectMode(CENTER);
  strokeWeight(2);
  rect(width / 2, height / 2, width - 10, height - 10);
  // circle(width / 2, height / 2, 200);

  //graphic parameters
  translate(width / 2, height / 2);
  strokeWeight(1);

  beginShape();

  for (let i = 0; i < 360; i++) {
    //convert x & y rad to deg
    //stop1 value -> internal radius, stop 2 value -> external radius
    let r = map(volHistory[i], 0, 1, 10, 600);
    let x = r * cos(i);
    let y = r *
      sin(i);
    vertex(x * 20, y * 20);
  }

  endShape();

  if (volHistory.length > 360) {
    volHistory.splice(0, 1);
  }
}

// function mouseClicked() {
//   saveCanvas('radial-image', 'png');
// }