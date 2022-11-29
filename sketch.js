var PLAY = 1
var END = 0
var gameState = PLAY


var cloud, cloudsGroup, cloudImage;
var trex ,trex_running;
var ground, groundImage, invisibleGround;
var obstacle1,obstaclesGroup, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png","trex4.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trex_collided = loadImage("trex_collided.png")
}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
 trex = createSprite (50,160,20,50)
 trex.addAnimation("running", trex_running) ;
 trex.addAnimation("collided",trex_collided);
 trex.scale = 0.5
 
 //criando o chão
 ground = createSprite (200,180,400,20)
 ground.addImage("ground", groundImage)
 ground.velocityX = -4
 
 //criando o chão invisivel
 invisibleGround = createSprite(200,190,400,10)
 invisibleGround.visible = false

obstaclesGroup = createGroup ()
cloudsGroup = createGroup ()


 score = 0;
}

function draw(){
  background(180)
  fill("Midnightblue")
  textSize(20)
  text("Pontuação: " + score,450,50)
  
  //fazendo trex encostar no chao invisel
  trex.collide(invisibleGround)
  

  if(gameState===PLAY){
   score = score + Math.round(frameCount/60) 
    if(ground.x < 0){
    ground.velocityX = -4
      ground.x = ground.width/2
  }
  trex.velocityY = trex.velocityY + 0.8
  spawnObstacles();
  spawnClouds()
  if(keyDown("space")&& trex.y >=100){
    trex.velocityY = -10
 
}
  if (obstaclesGroup.isTouching(trex)){
    gameState = END
  }
}
  else if (gameState === END){
    ground.velocityX = 0
    trex.velocityY = 0
    trex.changeAnimation("collide", trex_collided)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
  }
drawSprites();
}
function spawnClouds(){
if(frameCount % 60 === 0){
  var cloud = createSprite(600,100,40,10)
  cloud.addImage(cloudImage)
  cloud.y = Math.round(random(10,70))
  cloud.scale = 0.8
  cloud.velocityX = -3
  cloud.depth = trex.depth
  trex.depth = trex.depth + 1
  cloud.lifetime = 200
  cloudsGroup.add(cloud)
}


}
function spawnObstacles(){
  if(frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40) 
    obstacle.velocityX = -6
    obstacle.scale = 0.6
    obstacle.lifetime = 300
    obstaclesGroup.add(obstacle)

    var rand = Math.round(random(1,6))
     switch (rand){
      case 1: obstacle.addImage(obstacle1)
        break;
      case 2: obstacle.addImage(obstacle2)
        break;
      case 3: obstacle.addImage(obstacle3)
        break;
      case 4: obstacle.addImage(obstacle4)
        break;
      case 5: obstacle.addImage(obstacle5)
        break;
      case 6: obstacle.addImage(obstacle6)
        break;
      default: break;
     }
  } 
  
}

 