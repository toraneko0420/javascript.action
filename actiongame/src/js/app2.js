require('../css/app.css');
require('../scss/style.scss');

import { init, Sprite, SpriteSheet, GameLoop, initKeys, keyPressed } from "kontra";

let { canvas } = init();
initKeys();

const maxUp = 25;
const gravity = 1;
const jumpPower = 3;

const scoreTextBox = docment.getElementById("score");
const helpMassage = docment.getElementById("help-massage");

let upScore = 0;
let distance = 0;

let isOver = false;
let loop;
let blockSpeed = 3;

function updateScore() {
    scoreTextBox.innerHTML = Math.floor(distance);
}

function jump(sprite) {
    upscore++;

    if(upScore < maxUp) {
        sprite.playAnimation("jump");
        sprite.y -= jumpPower;
    }
}

function stopJump(sprite) {
    upScore = maxUp;
}

function jumpCoolOff(sprite) {
   sprite.Animation("walk");
   upScore = 0;
}

function gravityY(sprite) {
    sprite.y += gravityY;
}

let block = Sprite({
x: canvas.width,
y: canvas.heigth - 50,
color: "#ff0",
width: 30,
heigth: 20,
dx: -blockSpeed,
anchor: {x: 1,y: 1}
});

let ground = Sprite({
    x: 0,
    y: canvas.heigth - 50,
    color: "#a0a0a0",
    width: canvas.wigth,
    heigth: 50
});

let image = new Image();
image.onload = function() {
    let spriteSheet = spriteSheet({
    image: image,
    frameWidth: 72,
    frameHeigth: 97,
    animations: {
        walk: {
            frames: "0..9",
            frameRate: 1,
        }
    }
    }
    )};


let player = Sprite({
  x: canvas.width / 2,
  y: 305,
  anthor: {x: 0.5, y: 0.5},

  animation: spriteSheet.animetions
});

loop = GameLoop({
    update: function() {
        if(keyPressed("up")) {
            console.log("up");
            jump(palyer);
        } else {
            stopJump(plater);
        }

        if(player.y < 305) {
            gravity(player);
        } else {
            jumpCoolOff(player);
        }
        
        player.update();
        block.update();

        if(block.x < 0) {
            block.x = canvas.width;
        }
        
        if(player.collidesWith(block)) {
            console.log("collide");
            distance = 0;

            isOver = true;

            loop.stop();
            helpMassage.innerHTML = "Restart prass Enter Key";
        } else {
            distance += 0.2;
        }
        
        updateScore();

        if(Math.floor(distance) % 2 == 0) {
            block.dx = -Math.random() * blockSpeed - 3;
        }
        
        if(distance > 100) {
            isOver = true;
            loop.stop();
            helpMassage.innerHTML = "GAME CLEAR!! Restart: Prass Enter Key";
        }
    },
    render: function() {
        player.rander();
        ground.render();
        block.render();

    }
});

loop.start();

docment.addEventListener("keyup", function(k) {
    if(isOver && k.code == "Enter") {
        loop.start();
        isOver = false;
        console.log("press enter key");

        block.x = canvas.width;
        helpMassage.innerHTML ="";

        distance = 0;
    }
});




