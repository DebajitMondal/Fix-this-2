



var form,player,Ground,nonplayer,Ground2,Ground3,Ground4;
var GameState = 1;
var Button1Img,Button2Img;
var Sate = 1;
var Enemy,Enemy2;
var EnemyGroup;
var speedState = 1;
var jumpState = 1;
var Life1,Life2,Life3,Lifebox,Life1Img,Life2Img,Life3Img,LifeboxImg;
var Health = 3;
function preload() {
  //Button1Img = loadImage("Untitled12.png")
  //Button2Img = loadImage("Untitled34.png")
  Life1Img = loadImage("Untitled51.png")
  Life2Img = loadImage("Untitled51.png")
  Life3Img = loadImage("Untitled51.png")
  LifeboxImg = loadImage("Untitled61.png")
}



function setup() {
  createCanvas(1200,400);
  
  form = new Form()
 player = createSprite(-50,105,30,30)
 player.visible = false;
 player.debug = true
 player.setCollider("rectangle",0,0,120,20)
 nonplayer = createSprite(-200,105,30,30)
 nonplayer.debug = true
 nonplayer.setCollider("rectangle",0,0,120,20)
 nonplayer.visible = false;

 Lifebox = createSprite(1100,30,20,20)
 Lifebox.addImage("Box",LifeboxImg)
 Lifebox.scale = 0.2
 Lifebox.visible = false;
 Ground = createSprite(width/2,380,20000,20)
  Ground.visible = false

 Ground2 = createSprite(-50,130,500,10);
 Ground2.visible = false;
 Ground3 = createSprite(200,110,10,50)
 Ground3.visible = false;

 if(Health === 3){
 Life1 = createSprite(1065,30,20,20)
 Life1.addImage("health",Life1Img)
 Life1.scale = 0.15

 Life2 = createSprite(1100,30,30,20)
 Life2.addImage("healt",Life2Img)
 Life2.scale = 0.15

 Life3 = createSprite(1135,30,30,20)
 Life3.addImage("heal",Life3Img)
 Life3.scale = 0.15

 }
 
 EnemyGroup = new Group();
 speedGroup = new Group();
 jumpGroup = new Group();
 fullGroup = new Group();
}


function draw() {
  background("white");

  
  
  if(GameState === 1){
    form.display()
  }
  if(GameState === 2 ){
   
    console.log(frameCount)
    player.visible = true;
    player.velocityX = 6;
    Ground.visible = true;
    Ground2.visible = true;
    Ground3.visible = true;
    nonplayer.visible = true;
    Lifebox.visible = true;
    nonplayer.velocityX = 5;
    
    //Ground.velocityX = 6
    //if (Ground.x > 800){ 
   ///  Ground.x = Ground.width/2; 
    //}

    if(nonplayer.isTouching(Ground3)){
      nonplayer.velocityY = -10;
      
    }
    nonplayer.velocityY = nonplayer.velocityY + 0.9

    if(player.isTouching(Ground3)){
      player.velocityY = -10;
    }
     player.velocityY = player.velocityY + 0.9


     if(player.isTouching(Ground)){
      Sate = 2
   }
   if(Sate === 2){
     camera.position.x = player.x+220;
     player.setCollider("rectangle",0,0,25,25)
     
     Lifebox.x = camera.x+500
     Life1.x = camera.x+465
     Life2.x = camera.x+500
     Life3.x = camera.x+535

     if(keyDown("space")  && player.y >= 357){
      player.velocityY = -13;
      player.velocityY = player.velocityY + 0.9
     
     }
     

     if(EnemyGroup.isTouching(player)){
     
     player.velocityX = 0
      Health = Health-1

      if(Health === 2){
        Life3.destroy();
      }
      if(Health === 1){
        Life2.destroy();
      }
      if(Health === 0){
        Life1.destroy();
        GameState = 3;
      }
     EnemyGroup.destroyEach()
 
     }
     
 
     if(nonplayer.isTouching(EnemyGroup)){
       nonplayer.velocityY = -12;
       
     }
 
     if(nonplayer.isTouching(player)){
      GameState = 3;
     }
 
   if(speedGroup.isTouching(player)){
    speedState = 2;
    speedGroup.destroyEach();
   }
   if(speedState === 2){
     player.velocityX = 10;
     if(EnemyGroup.isTouching(player)){
        speedState = 1
        EnemyGroup.destroyEach();
    }
 
    }
 
    if(jumpGroup.isTouching(player)){
     jumpState = 2;
     jumpGroup.destroyEach();
     }
   if(jumpState === 2){
      if(keyDown("space") && player.y >= 357){
       player.velocityY = -16;
       player.velocityY = player.velocityY + 0.9
      }
 
      if(EnemyGroup.isTouching(player)){
       jumpState = 1
       EnemyGroup.destroyEach();
      }
 
      
    }
 


   }

    

   
  

   spwanObstacle();
   speedPower();
   Powerjump()
  
   
  
  }

  if(GameState === 3){
    console.log("you lose")
    EnemyGroup.setVelocityXEach(0);
    player.velocityX = 0
    

  }


  player.collide(Ground);
  nonplayer.collide(Ground);
  player.collide(Ground2);
  nonplayer.collide(Ground2);

  drawSprites();
}

function spwanObstacle(){
  push()
  if(frameCount % 270 === 0){
    Enemy = createSprite(camera.x+800,360,20,20)
   // Enemy.velocityX = -1
    var rand = Math.round(random(1,2))
    switch(rand){
     case 1: Enemy.shapeColor = "red"
             break;
     case 2: Enemy.shapeColor = "blue" 
     default: break;   

  }

  EnemyGroup.add(Enemy)
  
  pop()

  }





}




function speedPower(){
  if(frameCount % 500 === 0){
    Speed = createSprite(camera.x+800,360,20,20);
    Speed.shapeColor = "green";
    speedGroup.add(Speed);
  }
  

}




function Powerjump(){
if(frameCount % 800 === 0){  
  Fly = createSprite(camera.x+800,360,20,20)
  Fly.shapeColor = "black";
  jumpGroup.add(Fly)
}


}

