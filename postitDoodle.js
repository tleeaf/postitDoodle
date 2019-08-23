let w = 800;
let h = 800;
let X_MARGIN = w/10;
let Y_MARGIN = h/10;
let NUM_POINTS = 50;
let MAX_NUM_CURVES = 1;
let pArr;
let count = 0;
let POSTIT_YELLOW;
let a, b;

function setup() {
  POSTIT_YELLOW =  color(240,240,0);
  createCanvas(w, h);
  background(POSTIT_YELLOW);
  //pArr = randomPoints(NUM_POINTS);
  console.log(Math.log2(NUM_POINTS));
  pArr = pyramidPoints(NUM_POINTS);
  pArr = pArr.sort(sortByY);
  frameRate(25);
  //treeScan(pArr);
  a = {
    x: w/2,
    y: h/2,
   };
  b =  randomPoint();
  DrawSquigglies();
}

function draw(){
  b = {x: mouseX, y: mouseY};
  // background(240, 240, 0);
  // DrawSquigglies();
  //treeScan(pArr);
  //drawPoint(pArr[count]);
  //drawCurve(pArr[count],pArr[(count+1)%pArr.length]);
  //count++;  
}

function mouseClicked(){

}

function placePoint(){

}

function DrawSquigglies(){
  // drawCurve(a,b)
  drawCurvesBetween(a,b);
  drawPoint(a);
  drawPoint(b);
  // drawPerpdendicularBisector(a,b)
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
  let variance = 10;
  let result = 
  {
    x: point.x + point.x*random(variance) * random(-1,1),
    y: point.y + point.y*random(variance)*random(-1,1),
  };
  return result;
}

function drawCurvesBetween(a,b){
  noFill();
  //stroke(color(random(255),random(255),random(255)));
  stroke(0,0,60);
  //strokeWeight(random(0.1,10));
  strokeWeight(5);
  let numCurves = 2;
  let intPoints = [];
  intPoints.push(a);
  intPoints.push(b);
  for(let i = 0; i < numCurves; i++){
    let interiorPoint = randomPointBetween(intPoints[i], intPoints[intPoints.length - 1]);
    drawPoint(interiorPoint);
    console.log(interiorPoint);
    intPoints.splice(i+1,0,interiorPoint);
  }  
  console.log(intPoints);
  for(let i = 0; i < intPoints.length - 1; i++){
    drawPoint(intPoints[i])
    drawCurve(intPoints[i], intPoints[i+1]);
  }
}

function randomPointBetween(a,b){
  return {x: random(a.x,b.x), y: random(a.y,b.y)};
}

function drawCurve(a,b){
  noFill();
  //stroke(color(random(255),random(255),random(255)));
  stroke(0,0,60);
  //strokeWeight(random(0.1,10));
  strokeWeight(5);
  let popb = pointOnPerpendicularBisector(a,b);
  let ctrlA = popb;
  let ctrlB = popb;
  curve(
  ctrlA.x,ctrlA.y,
  a.x,a.y,
  b.x,b.y,
  ctrlB.x,ctrlB.y
  ); 
}

function pointOnPerpendicularBisector(a,b){
  let midPoint = {x: (a.x + b.x)/2, y: (a.y + b.y)/2};
  let slope = -(a.y - b.y)/(a.x - b.x);
  let intercept = midPoint.y - midPoint.x * slope;
  let res_x = midPoint.x + 100;
  let res_y = res_x * slope + intercept;
  return {x: res_x, y: res_y  };
}

function drawPerpdendicularBisector(a,b){
  let midPoint = {x: (a.x + b.x)/2, y: (a.y + b.y)/2};
  ellipse(midPoint.x,midPoint.y,10,10)
  let slope = -(a.y - b.y)/(a.x - b.x);
  let intercept = midPoint.y - midPoint.x * slope;
  let res_x = midPoint.x + 50;
  let res_y = res_x * slope + intercept;
  strokeWeight(1)
  stroke(200,0,0)
  line(midPoint.x,midPoint.y,res_x,res_y)
}

function drawPoint(point) {
  ellipseMode(CENTER);
  stroke(10);
  fill(10);
  // noFill();
  // strokeWeight(5);
  ellipse(point.x,point.y,20,20);
  fill(POSTIT_YELLOW);
  ellipse(point.x,point.y,18,18);
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
//  console.log(result.length);
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
