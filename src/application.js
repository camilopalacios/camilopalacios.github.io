/*
 * Function to add the second angular controller to the page
 */
;(function() {
  "use strict";
  angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById('GlassApp'), ['MeasureGlassApp']);
  });
}());

/*
 * Functions and variables to create and control the canvas demo
 */
$(document).ready(startGame);

var myGamePiece;

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    $('#canvas').append(this.canvas); // javascript: document.getElementById('canvas').insertBefore(this.canvas, document.getElementById('canvas').childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function(event){
      if([37, 38, 39, 40].indexOf(event.keyCode) > -1) event.preventDefault();
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[event.keyCode] = true;
    });
    window.addEventListener('keyup', function(event){
      myGameArea.keys[event.keyCode] = false;
    });
  },
  stop: function(){
    clearInterval(this.interval);
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function startGame(){
  myGamePiece = new component(30, 30, 'green', 10, 120);
  myObstacle = new component(10, 200, 'black', 100, 120);
  myGameArea.start();
}

function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function(obstacle){
    var myLeft = this.x,
    myRight = this.x + (this.width),
    myTop = this.y,
    myBottom = this.y + (this.height),
    obstacleLeft = obstacle.x,
    obstacleRight = obstacle.x + (obstacle.width),
    obstacleTop = obstacle.y,
    obstacleBottom = obstacle.y + (obstacle.height);
    return ((myBottom < obstacleTop) || (myTop > obstacleBottom) || (myRight < obstacleLeft) || (myLeft > obstacleRight)) ? false:true;
  }
}

function updateGameArea(){
  if(myGamePiece.crashWith(myObstacle)){
    myGameArea.stop();
  }
  else{
    myGameArea.clear();
    stopMove();
    if(myGameArea.keys && myGameArea.keys[37]) {moveLeft()}
    if(myGameArea.keys && myGameArea.keys[39]) {moveRight()}
    if(myGameArea.keys && myGameArea.keys[38]) {moveUp()}
    if(myGameArea.keys && myGameArea.keys[40]) {moveDown()}
    myGamePiece.newPos();
    myGamePiece.update();
    myObstacle.update();
  }
}

function moveUp(){
  myGamePiece.speedY -= 1;
  console.log(myGamePiece.speedY);
}

function moveDown(){
  myGamePiece.speedY += 1;
}

function moveLeft(){
  myGamePiece.speedX -= 1;
}

function moveRight(){
  myGamePiece.speedX += 1;
}

function stopMove(){
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}


/*
 * Functions for the responsive navigation menu
 */
function showMenu(){
  $('.topnav').toggleClass('responsive'); // Using javascript: document.getElementsByClassName('topnav')[0].classList.toggle('responsive');
}

function setActive(){
  $('.active').removeClass('active'); // Using javascript: document.getElementsByClassName('active')[0].classList.toggle('active');
  $(document.activeElement).parent().addClass('active'); // Using javascript: document.activeElement.parentElement.classList.toggle('active');
  $('.topnav').removeClass('responsive');
}
