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

var myGamePiece, walls, goal;

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    this.keys = [];
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
    window.addEventListener('mouseover', function(event) {
      var context = myGameArea.canvas.getContext("2d");
      var mousePos = myGameArea.getMousePos(myGameArea.canvas, event);
      var message = 'Mouse position: ' + Math.floor(mousePos.x) + ',' + Math.floor(mousePos.y);
      //console.log("before writing " + message);
      //myGameArea.writeMessage(myGameArea.canvas, message);
      context.font = '18pt Calibri';
      context.fillStyle = 'black';
      context.fillText(message, 10, 25);
    }, false);
    window.addEventListener('mousemove', function(event) {
      var context = myGameArea.canvas.getContext("2d");
      var mousePos = myGameArea.getMousePos(myGameArea.canvas, event);
      var message = 'Mouse position: ' + Math.floor(mousePos.x) + ',' + Math.floor(mousePos.y);
      //console.log("before writing " + message);
      //myGameArea.writeMessage(myGameArea.canvas, message);
      context.font = '18pt Calibri';
      context.fillStyle = 'black';
      context.fillText(message, 10, 25);
    }, false);

  },
  restart: function(){
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    $('#canvas').append(this.canvas); // javascript: document.getElementById('canvas').insertBefore(this.canvas, document.getElementById('canvas').childNodes[0]);
  },
  stop: function(){
    this.context.fillStyle = "white";
    this.context.fillRect(30,30, 420, 210);
    this.context.fillStyle = "red"; // draw font in red
    this.context.font = "40pt sans-serif";
    this.context.fillText("Game over", 100, 150);
    clearInterval(this.interval);
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  writeMessage: function(message){
    var context = this.canvas.getContext("2d");
    console.log("write message " + message)
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
  },
  getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  },
};

function startGame(){
  setComponents();
  myGameArea.start();
}

function restartGame(){
  setComponents();
  myGameArea.restart();
}

function setComponents(){
  goal = new component(30, 30, 'yellow', 440, 120);
  //myGamePiece = new component(30, 30, 'green', 10, 120);
  myGamePiece = new component(30, 30, 'green', 300, 200);
  walls = [];
  //  TODO:                CANVAS 480 x 270
  // HORIZONTALS
  walls.push(new component(50, 10, 'black', 0, 105));
  walls.push(new component(40, 10, 'black', 50, 205));
  walls.push(new component(80, 10, 'black', 90, 230));
  walls.push(new component(60, 10, 'black', 150, 180));
  walls.push(new component(50, 10, 'black', 430, 90));
  walls.push(new component(50, 10, 'black', 430, 190));
  walls.push(new component(10, 10, 'black', 390, 190));
  walls.push(new component(70, 10, 'black', 100, 85));
  walls.push(new component(70, 10, 'black', 100, 135));
  walls.push(new component(70, 10, 'black', 195, 120));
  walls.push(new component(80, 10, 'black', 215, 161));
  walls.push(new component(80, 10, 'black', 85, 40));
  walls.push(new component(20, 10, 'black', 200, 60));
  walls.push(new component(120, 10, 'black', 270, 28));
  walls.push(new component(80, 10, 'black', 270, 70));
  // walls.push(new component(width, 10, 'black', x, y));
  // walls.push(new component(width, 10, 'black', x, y));
  // walls.push(new component(width, 10, 'black', x, y));
  // walls.push(new component(width, 10, 'black', x, y));
  // walls.push(new component(width, 10, 'black', x, y));
  // walls.push(new component(width, 10, 'black', x, y));

  // VERTICALS

  walls.push(new component(10, 100, 'black', 50, 105));
  walls.push(new component(10, 25, 'black', 90, 205));
  walls.push(new component(10, 30, 'black', 50, 250));
  walls.push(new component(10, 90, 'black', 210, 180));
  walls.push(new component(10, 60, 'black', 32, 0));
  walls.push(new component(10, 40, 'black', 130, 0));
  walls.push(new component(10, 95, 'black', 220, 25));
  walls.push(new component(10, 40, 'black', 255, 230));
  walls.push(new component(10, 45, 'black', 100, 95));
  walls.push(new component(10, 19, 'black', 140, 180));
  walls.push(new component(10, 91, 'black', 295, 80));
  walls.push(new component(10, 100, 'black', 380, 38));
  walls.push(new component(10, 60, 'black', 380, 168));
  walls.push(new component(10, 10, 'black', 380, 260));
  // walls.push(new component(10, height, 'black', x, y));
  // walls.push(new component(10, height, 'black', x, y));
  // walls.push(new component(10, height, 'black', x, y));

}

function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    myGameArea.context.fillStyle = color;
    myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
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
  this.getCollisionSides = function(){
    var sides = [];
    for(w in walls){
      if(myGamePiece.crashWith(walls[w])){
        var myLeft = this.x,
        myRight = this.x + (this.width),
        myTop = this.y,
        myBottom = this.y + (this.height),
        obstacleLeft = walls[w].x,
        obstacleRight = walls[w].x + (walls[w].width),
        obstacleTop = walls[w].y,
        obstacleBottom = walls[w].y + (walls[w].height),
        overlap = 9999,
        side = undefined;
        if(myBottom > obstacleTop && myBottom <= obstacleBottom){
          if(myBottom-obstacleTop <= overlap){
            overlap = myBottom-obstacleTop;
            side = 'bottom';
          }
        }
        if(myTop < obstacleBottom && myTop >= obstacleTop){
          if(obstacleBottom-myTop <= overlap){
            overlap = obstacleBottom-myTop;
            side = 'top';
          }
        }
        if(myRight > obstacleLeft && myRight <= obstacleRight){
          if(myRight-obstacleLeft <= overlap){
            overlap = myRight-obstacleLeft;
            side = 'right';
          }
        }
        if(myLeft >= obstacleLeft && myLeft < obstacleRight){
          if(obstacleRight-myLeft <= overlap){
            overlap = obstacleRight-myLeft;
            side = 'left';
          }
        }
        if(side) sides.push(side);
      }
    }
    return sides;
  };
}

function updateGameArea(){
  var sides;
  myGameArea.clear();
  stopMove();

  if(myGamePiece.crashWith(goal)){
    myGameArea.stop();
  }
  else{
    sides = myGamePiece.getCollisionSides();
    if(myGameArea.keys && myGameArea.keys[37] && (!sides.length || jQuery.inArray('left', sides) == -1) && myGamePiece.x >= 0) {moveLeft();}
    if(myGameArea.keys && myGameArea.keys[38] && (!sides.length || jQuery.inArray('top', sides) == -1) && myGamePiece.y >= 0) {moveUp();}
    if(myGameArea.keys && myGameArea.keys[39] && (!sides.length || jQuery.inArray('right', sides) == -1) && myGamePiece.x + myGamePiece.width <= myGameArea.canvas.width) {moveRight();}
    if(myGameArea.keys && myGameArea.keys[40] && (!sides.length || jQuery.inArray('bottom', sides) == -1) && myGamePiece.y + myGamePiece.height <= myGameArea.canvas.height) {moveDown();}
    myGamePiece.newPos();
    myGamePiece.update();
    for(w in walls){
      walls[w].update();
    }
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
