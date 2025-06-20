let basket;
let fruits = [];
let trash = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
 
  // Inicializa a cesta
  basket = new Basket(width / 2, height - 50);
 
  // Começar a cair frutas e lixo
  frameRate(60);
}

function draw() {
  background(135, 206, 250);  // Céu azul
 
  if (gameOver) {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
    textSize(24);
    text("Pontuação: " + score, width / 2, height / 2 + 40);
    return;
  }

  // Exibir a cesta
  basket.show();
  basket.update();
 
  // Adicionar frutas e lixo de vez em quando
  if (frameCount % 60 === 0) {// se acada a cada 1 segundo (se o jogo roda a 60 FPS)
    if (random(1) < 0.7) { // Se aleatorio entre 0 e 1 
      fruits.push(new Fruit());
    } else {
      trash.push(new Trash());
    }
  }
  console.log(fruits)
  // Atualizar e mostrar frutas
  for (let i = fruits.length - 1; i >= 0; i--) {
    fruits[i].update();
    fruits[i].show();
   
    if (basket.collect(fruits[i])) {
      score++;
      fruits.splice(i, 1);
    }
   
    //if (fruits[i].offScreen()) { //ERRO AQUI
     // fruits.splice(i, 1);
   // }
  }
 
  // Atualizar e mostrar lixo
  for (let i = trash.length - 1; i >= 0; i--) {
    trash[i].update();
    trash[i].show();
   
    if (basket.collectTrash(trash[i])) {
      gameOver = true;
    }
   
    if (trash[i].offScreen()) {
      //trash.splice(i, 1);
    }
  }
 
  // Mostrar pontuação
  fill(0);
  textSize(24);
  text("Pontuação: " + score, 20, 30);
}

// Classe da cesta
class Basket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 30;
    this.speed = 10;
  }
 
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
   
    // Limitar a cesta dentro da tela
    this.x = constrain(this.x, 0, width - this.width);
  }
 
  show() {
    fill(255, 165, 0);  // Cor da cesta (laranja)
    rect(this.x, this.y, this.width, this.height);  // Cesta (como um retângulo)
  }
 
  // Coletar fruta
  collect(fruit) {
    return (
      this.x + this.width > fruit.x - fruit.size / 2 &&
      this.x < fruit.x + fruit.size / 2 &&
      this.y < fruit.y + fruit.size / 2 &&
      this.y + this.height > fruit.y - fruit.size / 2
    );
  }
 
  // Coletar lixo
  collectTrash(t) {
    return (
      this.x + this.width > t.x - t.size / 2 &&
      this.x < t.x + t.size / 2 &&
      this.y < t.y + t.size / 2 &&
      this.y + this.height > t.y - t.size / 2
    );
  }
}

// Classe da fruta
class Fruit {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = 30;
    this.speed = 5;
    this.emoji = this.getRandomFruitEmoji();
  }
 
  // Escolhe um emoji de fruta aleatoriamente
  getRandomFruitEmoji() {
    const emojis = ['🍎', '🍌', '🍓', '🍉', '🍍'];
    return random(emojis);
  }
 
  update() {
    this.y += this.speed;
  }
 
  show() {
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y);  // Desenha o emoji da fruta
  }
 
  offScreen() {
    return this.y > height;
  }
}

// Classe do lixo
class Trash {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = 30;
    this.speed = 4;
    this.emoji = '🗑️';  // Emoji de lixo
  }
 
  update() {
    this.y += this.speed;
  }
 
  show() {
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y);  // Desenha o emoji de lixo
  }
 
  offScreen() {
    return this.y > height;
  }
}