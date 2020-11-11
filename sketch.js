var ghost, ghost_Image;
var tower, tower_Image;
var door, door_Image, climber, climber_Image;
var doorsGroup, climbersGroup, invisibleGroup;
var invisibleClimber;
var PLAY=1, END=0;
var gameState=PLAY;


function preload(){
  
  ghost_Image = loadImage("ghost-standing.png");
  
  tower_Image = loadImage("tower.png");
  
  door_Image = loadImage("door.png");
  
  climber_Image = loadImage("climber.png");
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300, 600, 600);
  tower.addImage(tower_Image);
  
  ghost = createSprite(300, 300, 30, 50);
  ghost.addImage(ghost_Image);
  ghost.scale=0.4;
  
  
  
  
  
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  invisibleGroup=createGroup();
  
  
}


function draw(){
  background("black");
  
  if (gameState===PLAY){
     
  tower.velocityY=3;
  if (tower.y>400){
  tower.y=300;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-3;
  }
  
  ghost.velocityY=ghost.velocityY+0.1;
  
  if (keyDown("left")){
    ghost.x=ghost.x-2;
  }
  if (keyDown("right")){
    ghost.x=ghost.x+2;
  }
  
  
  
  spawnDoors();
  
  if (ghost.isTouching(climbersGroup)){
    ghost.velocityY=0;
    console.log("ghost is touching climber");
  }
  
    
    
  if (ghost.isTouching(invisibleGroup)||ghost.y>600){
    gameState=END;
    ghost.destroy();
  }
  
  console.log(gameState);
  
  drawSprites();
  }
  
  if (gameState===END){
    textSize(20);
    text("GAME OVER", 200, 300);
  }
}

function spawnDoors(){
  if (frameCount%200==0){
    door=createSprite(50, -60, 10, 50);
    door.addImage(door_Image);
    
    climber=createSprite(50, -10, 50, 10);
    climber.addImage(climber_Image);
    
    invisibleClimber=createSprite(50, 0, 50, 10);
    invisibleClimber.width=climber.width;
    invisibleClimber.height=climber.height;
    
    
    door.x=Math.round(random(130, 400));
    climber.x=door.x;
    invisibleClimber.x=door.x;
    
    invisibleClimber.visible=false;
  
    door.velocityY=3; 
    climber.velocityY=3;
    invisibleClimber.velocityY=climber.velocityY;
    
    door.lifetime=400;
    climber.lifetime=400;
    invisibleClimber.lifetime=400;
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisibleClimber);
}
  }
  

