var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var blockSize = 10;
var width = canvas.width / blockSize;
var height = canvas.height / blockSize;

var score = 0;
var point;

function Segment(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    ctx.fillStyle = "#000";
    ctx.fillRect(
      this.x * blockSize,
      this.y * blockSize,
      blockSize,
      blockSize
    );
  };

  this.isEqual = function (other) {
    return this.x === other.x && this.y === other.y;
  };
}

function Snake() {
  this.segments = [new Segment(5, 5), new Segment(4, 5), new Segment(3, 5)];
  this.direction = "right";

  this.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i].draw();
    }
  };

  this.update = function () {
    var head = this.segments[0];
    var newHead;

    if (this.direction === "right") {
      newHead = new Segment(head.x + 1, head.y);
    } else if (this.direction === "left") {
      newHead = new Segment(head.x - 1, head.y);
    } else if (this.direction === "up") {
      newHead = new Segment(head.x, head.y - 1);
    } else if (this.direction === "down") {
      newHead = new Segment(head.x, head.y + 1);
    }

    if (
      newHead.x < 0 ||
      newHead.x >= width ||
      newHead.y < 0 ||
      newHead.y >= height
    ) {
      gameOver();
      return;
    }

    if (newHead.x === point.x && newHead.y === point.y) {
      this.grow();
      score++;
      point.generate();
      updateScore();
    }

    this.segments.unshift(newHead);
    this.segments.pop();
  };

  this.grow = function () {
    var tail = this.segments[this.segments.length - 1];
    var newTail;

    if (this.direction === "right") {
      newTail = new Segment(tail.x - 1, tail.y);
    } else if (this.direction === "left") {
      newTail = new Segment(tail.x + 1, tail.y);
    } else if (this.direction === "up") {
      newTail = new Segment(tail.x, tail.y + 1);
    } else if (this.direction === "down") {
      newTail = new Segment(tail.x, tail.y - 1);
    }

    this.segments.push(newTail);
  };

  this.changeDirection = function (newDirection) {
    if (
      (newDirection === "right" && this.direction !== "left") ||
      (newDirection === "left" && this.direction !== "right") ||
      (newDirection === "up" && this.direction !== "down") ||
      (newDirection === "down" && this.direction !== "up")
    ) {
      this.direction = newDirection;
    }
  };
}

function Apple() {
  this.generate = function () {
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
  };

  this.draw = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x * blockSize,
      this.y * blockSize,
      blockSize,
      blockSize
    );
  };
}

var snake = new Snake();
point = new Apple();
point.generate();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw();
  point.draw();
}

function update() {
  snake.update();
  draw();
}

function gameOver() {
  clearInterval(gameInterval);
  var finalScore = document.getElementById("finalScore");
  finalScore.textContent = score;
  var modal = document.getElementById("gameOverModal");
  modal.style.display = "block";
}

function updateScore() {
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}

function keyDownHandler(event) {
  var newDirection;

  switch (event.keyCode) {
    case 37: // Left
      newDirection = "left";
      break;
    case 38: // Up
      newDirection = "up";
      break;
    case 39: // Right
      newDirection = "right";
      break;
    case 40: // Down
      newDirection = "down";
      break;
    default:
      return;
  }

  snake.changeDirection(newDirection);
}

document.addEventListener("keydown", keyDownHandler);

var gameInterval = setInterval(update, 100);

var modal = document.getElementById("gameOverModal");
var closeButton = document.getElementsByClassName("close")[0];

closeButton.onclick = function () {
  modal.style.display = "none";
  resetGame();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetGame();
  }
};

function resetGame() {
  score = 0;
  snake = new Snake();
  point.generate();
  updateScore();
  gameInterval = setInterval(update, 100);
}
document.getElementById("jugarButton").addEventListener("click", function() {
  document.getElementById("banner").style.display = "none";
  document.getElementById("juego").style.display = "flex";
  // Aquí puedes agregar cualquier lógica adicional para iniciar tu juego
});
document.getElementById("jugarButton").addEventListener("click", function() {
  reiniciarJuego();
});

function reiniciarJuego() {
  // Restablecer el estado del juego a su estado inicial
  // Aquí puedes agregar la lógica necesaria para reiniciar tu juego
  
  // Por ejemplo, si tienes una función llamada "iniciarJuego()" que configura el juego:
  iniciarJuego();
  
  // Si tienes elementos dentro del div del juego que necesitan reiniciarse, puedes borrar su contenido:
  document.getElementById("juego").innerHTML = "";
  
  // Asegúrate de ocultar el banner y mostrar el juego nuevamente:
  document.getElementById("banner").style.display = "none";
  document.getElementById("juego").style.display = "flex";
}
