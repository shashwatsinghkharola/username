//Accesing Canvas
const canvas= document.getElementById("myGame");
const context= canvas.getContext('2d');

//rectangle function
function drawRect(x,y,w,h,color){
    context.fillStyle = color
    context.fillRect(x,y,w,h)
}
 

 // computer 

 const com = {
    x: canvas.width/2 - 50/2,
    y: 10,
    width: 50,
    height: 10,
    color: "white",
    score: 0
 }
 


 //user

 const user = {
    x: canvas.width/2 - 50/2,
    y: canvas.height -10 -10,
    width: 50,
    height: 10,
    color : 'white',
    score : 0
 }


 //seprating line

 function centreLine(){
    context.beginPath()
    context.setLineDash([10])
    context.moveTo(0,canvas.height/2)
    context.lineTo(canvas.width,canvas.height/2)
    context.strokeStyle = "white"
    context.stroke()
    
 }
 
 

 //draw circle

 function drawCircle(x,y,r,color){

   context.fillStyle = color
   context.beginPath()
   context.arc(x,y,r,Math.PI*2,false)
   context.closePath()
   context.fill()
 }

 //Ball
 const Ball = {
   x: canvas.width/2,
   y: canvas.height/2,
   radius: 10,
   speed: 1,
   velocityX: 5,
   velocityY: 5,
   color: "white",
 }

 // Score

 function drawScore(text,x,y,color){
   context.fillStyle = color
   context.font = "32px josefine sans"
   context.fillText(text,x,y,)
 }

// render the game

function render(){

   // canvas
 drawRect(0,0,400,600,"black");

 
 // computer paddle
 drawRect(com.x, com.y ,com.width, com.height, com.color );

 // user paddle
 drawRect(user.x, user.y ,user.width, user.height, user.color)

 // seperating line
 centreLine()

 // ball
 drawCircle(Ball.x,Ball.y,Ball.radius,Ball.color)

  // score
  drawScore(com.score,20,canvas.height/2 - 30)
  drawScore(user.score,20,canvas.height/2 + 50)

}
 


// control the user paddle

canvas.addEventListener("mousemove" , movepaddle);
function movepaddle(e){
   let rect = canvas.getBoundingClientRect();
   user.x = e.clientX - rect.left - user.width/2;
}

// colision detection 
function collision(b,p){
   b.top = b.y - b.radius;
   b.bottom = b.y + b.radius;
   b.left = b.x - b.radius;
   b.right = b.x + b.radius;

   p.top = p.y ;
   p.bottom = p.y + p.height;
   p.left = p.x;
   p.right = p.x + p.width;

   return p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom
}

// reset ball
function resetBall(){
   Ball.x = canvas.width/2;
   Ball.y = canvas.height/2;

   Ball.speed = 1;
   Ball.velocityY = -ball.velocity;
}

// Game over function
function ShowGameOver(){
   // Hide canvas
   canvas.style.display = "none";
   const can = document.getElementById("can");
   can.style.display = "none";
   // container
   const result = document.getElementById("result");
   result.style.display = "block";

}



// update
function update(){
   Ball.x += Ball.velocityX*Ball .speed;
   Ball.y += Ball.velocityY*Ball.speed;

   //control the computer  paddle
   let computerLevel = 0.1;
   com.x += (Ball.x - (com.x + com.width/2)) + computerLevel;
   if(Ball.speed >3){
      com.x += Ball.x + 100;

   }

   // reflect from wall 
   if(Ball.x + Ball.radius > canvas.width || Ball.x - Ball.radius <0){ Ball.velocityX = -Ball.velocityX;}

   // if collision happens
   let player = (Ball.y < canvas.height/2) ? com : user;
   if(collision(Ball,player)){
      Ball.velocityY = -Ball.velocityY;
      Ball.speed += 0.1;
   }

   // points
   if(Ball.y - Ball.radius < 0){
      user.score++
      resetBall()
   }else if(Ball.y + Ball.radius > canvas.height){
      com.score++
      resetBall()
   }

   //Game over
   if(user.score > 4 || com.score > 4){
      clearInterval(loop);
      ShowGameOver();
   }


}

// start game
 function start(){
   update();
   render()
 }

 // loop
 const loop = setInterval(start,1000/50);




 


