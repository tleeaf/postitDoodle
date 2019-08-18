let w = 1920;
let h = 1080 ;
let X_MARGIN = w/10;
let Y_MARGIN = h/10;
let NUM_POINTS = 1000;
let pArr;
let count = 0;
function setup() {
  createCanvas(w, h);
  background(240, 240, 0);
  //pArr = randomPoints(NUM_POINTS);
  console.log(Math.log2(NUM_POINTS));
  pArr = pyramidPoints(NUM_POINTS);
  pArr = pArr.sort(sortByY);
  frameRate(1);
  //treeScan(pArr);
}

function draw(){
  
  treeScan(pArr);
  //drawPoint(pArr[count]);
  //drawCurve(pArr[count],pArr[(count+1)%pArr.length]);
  //count++;  
}

function treeScan(points){
  let root = points[0];
  drawPoint(root);
  let childArr = points.slice(1);
  if(childArr.length > 0){
    childArr = childArr.sort(sortByX);
    let l_sub = childArr.slice(0,childArr.length/2).sort(sortByY);
    let r_sub = childArr.slice(childArr.length/2).sort(sortByY);
    if(l_sub.length > 0){ drawCurve(root,l_sub[0]); treeScan(l_sub); }
    if(r_sub.length > 0){ drawCurve(root,r_sub[0]); treeScan(r_sub); }
  }
}

function sortByX(p1,p2){
  return  p1.x > p2.x ? 1 : -1;
}

function sortByY(p1,p2){
  return  p1.y > p2.y ? 1 : -1;
}

function linearScan(pArr){
  for(let i = 0; i < pArr.length; i++)
  {
    drawPoint(pArr[i]);
    if(i + 1 < pArr.length){
      drawCurve(pArr[i],pArr[i+1]);
    }   
  }
}

function randomControlPoint(point){
  let variance = 0.5;
  let result = 
  {
    x: point.x + point.x*random(variance) * random(-1,1),
    y: point.y + point.y*random(variance)*random(-1,1),
  };
  return result;
}

function drawCurve(a,b){
  noFill();
  stroke(color(random(255),random(255),random(255)));
  //stroke(10);
  //strokeWeight(random(0.1,10));
  strokeWeight(5);
  let ctrlA = randomControlPoint(a);
  let ctrlB = randomControlPoint(b);
  curve(
  ctrlA.x,ctrlA.y,
  a.x,a.y,
  b.x,b.y,
  ctrlB.x,ctrlB.y
  ); 
}

function drawPoint(point) {
  ellipseMode(CENTER);
  stroke(10);
  fill(10);
  ellipse(point.x,point.y,10,10);
}

function pyramidPoints(number){
 result = [];
 let numLevels = floor(Math.log2(number));
 for(let i = 0; i < numLevels; i++){
   for(let j = 0; j < pow(2,i); j++){
    result.push( {
      x: w/2+ random(-1,1)*random(w/2),
      y: h/numLevels*i + random(h/numLevels),      
    });
   }
 }
 console.log(result.length);
 return result;
}

function randomPoints(number){
  result = [];
  for(let i = 0; i < number; i++){
    result[i] = randomPoint();
  }
  return result;
}

function randomPoint() {
  let point = {
    x: 
    random(0 + X_MARGIN, w - X_MARGIN),
    //randomGaussian(w/2,w/8), 
    y: 
    random(0 + Y_MARGIN, h - Y_MARGIN),
    //randomGaussian(h/2,h/8), 
  };
  return point ;
}
