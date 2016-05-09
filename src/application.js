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
    myGameArea.context.fillStyle = "white";
    myGameArea.context.fillRect(30,30, 420, 210);
    myGameArea.context.fillStyle = "red"; // draw font in red
    myGameArea.context.font = "40pt sans-serif";
    myGameArea.context.fillText("Game over", 100, 150);
    clearInterval(this.interval);
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function startGame(){
  goal = new component(30, 30, 'yellow', 440, 120);
  //goal = new component(30, 30, 'yellow', 50, 120);
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
  };

  this.getCollisionSide = function(obstacle){
    var myLeft = this.x,
    myRight = this.x + (this.width),
    myTop = this.y,
    myBottom = this.y + (this.height),
    obstacleLeft = obstacle.x,
    obstacleRight = obstacle.x + (obstacle.width),
    obstacleTop = obstacle.y,
    obstacleBottom = obstacle.y + (obstacle.height),
    overlap = 9999,
    side = undefined;
    if(myBottom > obstacleTop && myBottom < obstacleBottom){
      if(myBottom-obstacleTop < overlap){
        overlap = myBottom-obstacleTop;
        side = 'bottom';
      }
    };
    if(myTop < obstacleBottom && myTop > obstacleTop){
      if(obstacleBottom-myTop < overlap){
        overlap = obstacleBottom-myTop;
        side = 'top';
      }
    };
    if(myRight > obstacleLeft && myRight < obstacleRight){
      if(myRight-obstacleLeft < overlap){
        overlap = myRight-obstacleLeft;
        side = 'right';
      }
    };
    if(myLeft > obstacleLeft && myLeft < obstacleRight){
      if(obstacleRight-myLeft < overlap){
        overlap = obstacleRight-myLeft;
        side = 'left';
      }
    };
    return side;
  };
}

function updateGameArea(){
  var side;
  myGameArea.clear();
  stopMove();

  if(myGamePiece.crashWith(goal)){
    myGameArea.stop();
  }
  else{
    if(myGamePiece.crashWith(myObstacle)) side = myGamePiece.getCollisionSide(myObstacle);
    if(myGameArea.keys && myGameArea.keys[37] && (!side || side!='left') && myGamePiece.x >= 0) {moveLeft()}
    if(myGameArea.keys && myGameArea.keys[38] && (!side || side!='top') && myGamePiece.y >= 0) {moveUp()}
    if(myGameArea.keys && myGameArea.keys[39] && (!side || side!='right') && myGamePiece.x + myGamePiece.width <= myGameArea.canvas.width) {moveRight()}
    if(myGameArea.keys && myGameArea.keys[40] && (!side || side!='bottom') && myGamePiece.y + myGamePiece.height <= myGameArea.canvas.height) {moveDown()}
    myGamePiece.newPos();
    myGamePiece.update();
    myObstacle.update();
    goal.update();
  }

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
