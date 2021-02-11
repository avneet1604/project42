var bg,bgImg;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

var END =0;
var PLAY =1;
var gameState = 1;

function preload(){
  bgImg=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  player_collided= loadAnimation("Monkey_01.png")
}

function setup() {
  createCanvas(800,400);
  
  bg=createSprite(0,0,800,400);
  bg.addImage(bgImg);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
  //monkey 
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("collided", player_collided);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup= new Group();
  obstaclesGroup= new Group();

  score=0;
  col=0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    player.changeAnimation("moving", player_running);

  //infinite bg
  if(bg.x<100){
    bg.x=bg.width/2;
  }
    //key control
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    //gravity
    player.velocityY = player.velocityY + 0.8;
    //collide ground
    player.collide(ground);

    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(player))
    {
      foodGroup.destroyEach();
      score= score+2;
      
      switch(score) {
      case 10: player.scale=0.12;
        break;
      case 20: player.scale=0.14;
        break;
      case 30: player.scale=0.16;
        break;
      case 40: player.scale=0.18
        break;
      default: break;
  
      }
    }

    if(obstaclesGroup.isTouching(player)){
      player.scale=0.1;
      obstaclesGroup.destroyEach();
    col+=1;
    }

    if(col===1){
      gameState=END;
    }
    
  //closing of if play cond
  }

  if(gameState===END){
    bg.velocityX=0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    player.collide(ground);
    
    player.changeAnimation("collided", player_collided);
    
  }

  drawSprites();

  if(gameState===END)
  {
    fill("white");
    textSize(35);
    text("GAME OVER", 350,200);
  }
       stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 150,100);
 
//closing of draw fn
}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    
     banana.addImage(bananaImage);
     banana.scale=0.07;
    
   
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
   
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
     
    obstacle.lifetime = 300;
    
 
    obstaclesGroup.add(obstacle);
  }
}