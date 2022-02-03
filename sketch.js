var spaceship, spaceshipAI1, spaceshipAI2,  laser, laser2, powerUp, explosion, border1, border2, timer;
var bigAsteriod, mediumAsteriod, spaceBackground, spaceBackground2, spaceDodgers, START_SPACE;
var spaceshipImg, laserImg, powerUpImg, explosionImg, bigAsteriodImg, mediumAsteriodImg, spaceBackgroundImg, spaceBackgroundImg2, SpaceDodgerImg, START_SPACE_IMG;
var distance = 0
var powerUpG, asteriodG;

//Game states
var START = 1
var PLAY = 2
var END = 0
var gameState = START



function preload(){
//loading images/animations
spaceshipImg = loadImage("spaceship.png");
laserImg = loadImage("laserSprite.png");
powerUpImg = loadImage("laserPowerUp.png");
explosionImg = loadImage("2_explosion.png");
bigAsteriodImg = loadImage("big_asteriod.png");
mediumAsteriodImg = loadImage("medium_asteriod.png");
spaceBackgroundImg = loadImage("space_background.jpg");
spaceBackgroundImg2 = loadImage("space_background.jpg");
SpaceDodgerImg = loadImage("spaceDodgers.png");
START_SPACE_IMG = loadImage("START_SPACE.png");
}

function setup() {
 createCanvas(1270, 645);
 //creating sprites/groups
 spaceBackground = createSprite(560, 645/2, 10,10);
 spaceBackground.scale = 2
 spaceBackground.addImage("spaceBackground", spaceBackgroundImg);
 spaceBackground.velocityX = -7;

 spaceBackground2 = createSprite(2250, 645/2, 10,10);
 spaceBackground2.scale = 2
 spaceBackground2.addImage("spaceBackground2", spaceBackgroundImg2);
 spaceBackground2.velocityX = -7;
 

 powerUpG = new Group();
 asteriodG = new Group();

 spaceship = createSprite(120, 645/2, 10, 10)
 spaceship.scale = 0.85;
 spaceship.addImage("spaceship", spaceshipImg);
 spaceship.debug = true

 spaceshipAI1 = createSprite(600, 342.475, 70, 39.95);
 spaceshipAI1.debug=true
 spaceshipAI1.visible=false

 spaceshipAI2 = createSprite(600, 302.525, 70, 39.95);
 spaceshipAI2.debug=true
 spaceshipAI2.visible=false

 spaceDodgers = createSprite(1270/2, 50, 10, 10);
 spaceDodgers.scale=2;
 spaceDodgers.addImage("spaceDodgers", SpaceDodgerImg)

 START_SPACE = createSprite(1270/2, 600, 10, 10);
 START_SPACE.scale=2;
 START_SPACE.addImage("START_SPACE", START_SPACE_IMG)

 laser = createSprite(470, 10, 10, 10)
 laser.scale = 1
 laser.addImage("laser", laserImg)
 laser.visible = false

 laser2 = createSprite(470, 200, 10, 10);
 laser2.scale = 1;
 laser2.addImage("laser2", laserImg);
 laser2.visible = true;
 laser2.debug = false

 border1 = createSprite(1270, 645/2, 10, 1270);

 border2 = createSprite(0, 645/2, 10, 1270);

 spaceship.addAnimation("explosion", explosionImg);
 
 timer = createSprite(1000, 645/2, 10, 645);
 timer.visible = false;
}

function draw() {
  
  laser.y = spaceship.y + 21.5
  laser2.y = spaceship.y - 21.5
 spaceship.changeImage(spaceshipImg)

  createEdgeSprites()
  //infinte background
  if(spaceBackground.x < -1000){
      spaceBackground.x =2256;
  }   

  if(spaceBackground2.x < -1000){
    spaceBackground2.x = 2256;
}

spawnAsteriods();
spawnLaserPowerUp();

spaceship.collide(border1);
spaceship.collide(border2);

if(gameState === START){
 
spaceship.setCollider("rectangle", 300, 0, 800, 100)


spaceshipAI1.y = spaceship.y+19.975
spaceshipAI2.y = spaceship.y-19.975
if(spaceship.isTouching(asteriodG)) {
    if(spaceshipAI1.isTouching(asteriodG)){
      spaceship.velocityY = -2
    }
    if(spaceshipAI2.isTouching(asteriodG)){
      spaceship.velocityY = 2
    }
    if(spaceshipAI1.isTouching(asteriodG) && spaceshipAI2.isTouching(asteriodG)){
      spaceship.velocityY = 2
    }
    }
else{
  spaceship.velocityY = 0 
}

if(keyDown("Up") || keyDown("Down")){
 gameState = PLAY

}

}
if(gameState === PLAY){
  spaceDodgers.visible = false
  START_SPACE.visible = false
  spaceship.setCollider("rectangle", 0, 0, 250, 100)
  if(spaceship.isTouching(spaceBackground)||spaceship.isTouching(spaceBackground2)){
  if(keyDown("up")|| keyDown("w")){
    spaceship.velocityY = -4
  }
  if(keyDown("down")|| keyDown("s")){
    spaceship.velocityY = 4
  }
}
  else{
    spaceship.velocityY = 0
  }
  if(spaceship.isTouching(powerUpG)){
    laser.visible=true
    laser2.visible=true
    timer.velocityX = -2
    powerUp.destroy
    laser.setCollider("rectangle", 0, 0, 600, 5)
    laser2.setCollider("rectangle", 0, 0, 600, 5)
  }
  if (spaceship.isTouching(asteriodG)){
  spaceship.addAnimation("spaceship", explosionImg);
  spaceship.changeImage(spaceshipImg);

  }
  if (spaceship.isTouching(timer)){
    laser.visible = false
    laser2.visible = false
    timer.y = 1000
    laser.setCollider("rectangle", 0, 0, 0, 0)
    laser2.setCollider("rectangle", 0, 0, 0, 0)
  }

  if (laser.isTouching(asteriodG)||laser2.isTouching(asteriodG)){
    asteriod.addImage(explosionImg)
    asteriod.destroy
  }





}

drawSprites();
}




function spawnAsteriods(){

    if (frameCount % 70 === 0){
        var asteriod = createSprite(1400, 645/2,10,10);
        asteriod.velocityX = -7;
        asteriod.y =  Math.round(random(40, 605))
         //making random asteriods
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: asteriod.addImage(bigAsteriodImg);
                   break;
           case 2: asteriod.addImage(mediumAsteriodImg);
                   break;
           default: break;
         }          
         asteriod.scale = 1;
         asteriod.lifetime = 1000;
         asteriodG.add(asteriod);
         asteriod.debug = true
      }
    }

      function spawnLaserPowerUp(){

        if (frameCount % 220 === 0){
            powerUp = createSprite(1400, 645/2,10,10);
            powerUp.addImage(powerUpImg)
            powerUp.velocityX = -7;
            powerUp.y =  Math.round(random(40, 605))
            powerUp.setCollider("circle", 0, 0, 20 )
            powerUp.scale = 1.5;
            powerUp.lifetime = 1000;
            powerUpG.add(powerUp);
            powerUp.debug = true
          }
        }