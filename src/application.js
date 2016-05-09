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

function startGame(){
  myGameArea.start();
  myGamePiece = new component(30, 30, 'green', 10, 120);
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
}

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    $('#canvas').append(this.canvas); // javascript: document.getElementById('canvas').insertBefore(this.canvas, document.getElementById('canvas').childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateGameArea(){
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
}

function moveUp(){
  myGamePiece.speedY -= 1;
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
