// 最終課題を制作しよう

let angle = 0;
let spinning = false;
let spinSpeed = 0;
let flashingSegment = -1; // 点滅対象のセグメント
let flashing = false;

// ボールの位置と速度
let ballX = 0, ballY = 0;
let ballVX = 2, ballVY = 3; // 初期速度
let ballRadius = 10; // ボールの半径
let innerRadius = 160; // ボールが跳ね回る最大範囲
let ballStopped = false; // ボールが停止したかどうか


function setup() {
  createCanvas(400, 400);
}
  function draw() {
  background(255);
  translate(width / 2, height / 2);
    stroke(255);
  strokeWeight(2);
  rotate(angle);
  
  const maxR = min(width, height);
  const red = color(255, 0, 0);
  const blue = color(152, 188, 245);
  const black = color(0);
  const lightblue = color(162, 232, 242);
  const purple = color (179, 146, 240);
    
　drawCircle(black, maxR);
  drawArcs(red, black, red, black, maxR * 0.8);
  drawArcs( lightblue, blue, lightblue, purple, maxR * 0.75);
  drawArcs(black, red, black,red, maxR * 0.45);
  drawArcs(lightblue, blue, lightblue, purple, maxR * 0.4);
  drawCircle(red, maxR * 0.1);
  
  // スピン処理
  if (spinning) {
    angle += spinSpeed;
    spinSpeed *= 0.99; // 徐々に減速
    if (spinSpeed < 0.01) {
      spinning = false;
      ballStopped = true; // ボールも停止
      determineFlashingSegment(); // 回転停止時に点滅セグメントを決定
    }
  }

  // 点滅処理
  if (!spinning && flashingSegment >= 0) {
    flashSegment();
  }

  // ボールのアニメーション
  if (!ballStopped) {
  updateBall(maxR);
  }
  drawBall();
}
function drawCircle(c, r) {
  fill(c);
  ellipse(0, 0, r, r);
}


function drawArcs(c1, c2, c3, c4, r) {
  const cx = 0; 
  const cy = 0;
  for (let i = 0; i < 20; i++) {
    let start = TWO_PI / 20 * i;//ここからわからへん。１つずつ進んでる。０から１，１から２
    let stop = TWO_PI / 20 * (i + 1);
  
    if(i % 4 == 0){
      fill(c1)
    }
    else if (i % 4 == 1){
      fill(c2)
    }
    else if (i % 4 == 2){
      fill(c3)
    }
    else{
      fill(c4)
    }
    arc(cx, cy, r, r, start, stop, PIE);
  }
}


// 点滅対象のセグメントを決定
function determineFlashingSegment() {
  const segmentCount = 20; // セグメント数
  const normalizedAngle = angle % TWO_PI; // 現在の角度を 0〜TWO_PI に正規化
  flashingSegment = floor(map(normalizedAngle, 0, TWO_PI, 0, segmentCount));
  flashing = true; // 点滅開始
}

//点滅
function flashSegment() {
  if (frameCount % 30 === 0) { // 30フレームごとに
    flashing = !flashing;
  }
}

// ボールの更新処理
function updateBall(maxR) {
  ballX += ballVX;
  ballY += ballVY; 

  // 壁で反射 (内側と外側の円)
  const distance = dist(0, 0, ballX, ballY);
  const minRadius = maxR * 0.1; // 最内円の半径

  if (distance + ballRadius > innerRadius) {
    // 壁にぶつかったときの反射処理
    let angleToCenter = atan2(ballY, ballX);
    let normalX = cos(angleToCenter);
    let normalY = sin(angleToCenter);

    // 速度ベクトルを法線に反射
    let dot = ballVX * normalX + ballVY * normalY;
    ballVX -= 2 * dot * normalX;
    ballVY -= 2 * dot * normalY;
  }
}

// ボールの描画
function drawBall() {
  if (ballStopped && flashing) {
    fill(255, 255, 0); // 点滅色: 黄色
  } else {
    fill(255);
  }
  noStroke();
  ellipse(ballX, ballY, ballRadius * 2, ballRadius * 2);
}

function mousePressed() {
  if (!spinning) {
    spinning = true;
    spinSpeed = random(0.1, 0.3); // 回転速度をランダムに設定
    flashingSegment = -1; // 点滅解除
    flashing = false;
    ballStopped = false; // ボールを動かす

    // ボールの初期位置と速度をリセット
    ballX = random(-innerRadius / 2, innerRadius / 2);
    ballY = random(-innerRadius / 2, innerRadius / 2);
    ballVX = 10 ;
    ballVY = 10 ;
  }
}