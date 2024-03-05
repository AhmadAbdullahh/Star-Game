// sketch.js
// Canvas
// AME 230
//

let list;
let Stars;
let starCount = 0;
let elapsedTime = 0;
let startTime;

function setup() {
  createCanvas(650, 800);


// TILE START 
  list = [];
  let x = 0;
  let y = 0;
  let w = 25;

    while(y < height){
    
    x = 0;

        while(x < width) {
          let t = new Tile(x,y,w);
          list.push(t);
      
          x = x + w;
          
        }
        y = y + w;
      }

     //noLoop();
     // TILE END


   
     Stars =[]
     for (let i = 0; i < 20; i++) {
      let x = random(width);
      let y = random(height);
      let radius = random(10, 50);
      let s = new Star(x, y, radius);
      Stars.push(s);
      starCount++; // Increment starCount for each star added


      startTime = millis();
    }
      }
     
function draw() {
  background(188);


 // renders Tiles 
 for(let y = 0; y < list.length; y += 1 ){
    list[y].render();

  }


  // renders Stars
for(let i = 0 ; i < Stars.length ; i += 1 ){
  Stars[i].render();
}


//Star count BOX
fill(2,255,25)
rect(25,20,110,30);
// FOR STAR COUNT 
fill(255,355,60);
textSize(25);
text("Stars: " + starCount, 26, 42);    


fill(2,355,25,);
textSize(25);
text("Remove All Stars to WIN !!", 200, 792); 

// for time 

elapsedTime = floor((millis() - startTime) / 500);

// Display elapsed time
text("Time: " + elapsedTime + " S", width - 230, 30);



if (starCount === 0 ) {
  fill(255, 0, 0);
  textSize(55);
  textAlign(CENTER, CENTER);
  text("Congratulations! You Won!", width / 2, height / 2);
 
}

if(elapsedTime > 120){
  fill(255, 0, 0);
  textSize(55);
  textAlign(CENTER, CENTER);
  text("YOU LOST!! LOSER", width / 2, height / 2);
}
}

function mousePressed(){
  for(let i = 0 ; i < Stars.length ; i += 1){
  if(Stars[i].isInside(mouseX,mouseY) == true){
    Stars.splice(i , 1);
    starCount-- ;
    return ;
   }
  }
  let s1 = new Star(mouseX,mouseY,random(10,50));
  Stars.push(s1);
  starCount++;
  
}




class Tile{

  constructor(x,y,size){

    this.x = x;
    this.y = y;
    this.size = size;

    this.r = 0;
    this.g = 50;
    this.b = 200;


  }

  render(){


    let v = sin(frameCount/12 + this.x + this.y );
    this.r =(v + 1.0)* 127;
    //this.g =(v + 1.0)* 127;
    

    stroke(0);
    fill(this.r ,this.g ,this.b );
    rect(this.x,this.y,this.size,this.size);
  }
}

  class Star {

    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.startAngle = -PI/2//(-PI / 2, PI / 2);
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.strokeColor = color(0,0,0);
      this.fillColor = color(random(0,255),random(0,255),random(0,255));
      this.numberOfPoints = 5;
      this.depth = 0.4;
    }
  
    render() {

      this.x += 2.1;
      if(this.x > width){
        this.x = 0;
      }
      this.g += 0.1;
      this.startAngle += 0.03;
      let delta = TWO_PI / this.numberOfPoints;
      let count = 0;
      let a = this.startAngle;
      strokeWeight(2);
      stroke(this.strokeColor);
      fill(this.r,this.g,this.b);
      beginShape();
      while (count < this.numberOfPoints) {
    
        let x1 = cos(a) * this.radius + this.x;
        let y1 = sin(a) * this.radius + this.y;
        vertex(x1, y1);
    
        let x2 = cos(a + delta/2) * this.radius * this.depth + this.x;
        let y2 = sin(a + delta/2) * this.radius * this.depth + this.y;
        vertex(x2,y2);
    
        a += delta;
        count += 1;
      }
      endShape(CLOSE);
    }
  

    isInside(px,py){
      let d = dist(this.x,this.y,px,py);
      if(d < this.radius * this.depth){
        return true;
      }
      else{
        return false
      }
    }


  }