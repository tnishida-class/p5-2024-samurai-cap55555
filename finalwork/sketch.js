// 最終課題を制作しよう



//ここからダーツ

function setup() {
  const green = color(0, 255, 0);
  const red = color(255, 0, 0);
  const black = color(0)
  const cream = color(242, 212, 147);
  const blue = color(0,0, 255);
  const white = color(255)
  createCanvas(400, 400);
  background(255);
  stroke(255);
  strokeWeight(3);//線太さ

  const cx = width / 2; // 中心は (cx, cy)
  const cy = height / 2;
  const maxR = min(width, height); // 大きさは幅と高さのうち小さい方　別にminじゃなくてもいい。widthだけでもいいんじゃね

  drawCircle(black, maxR);
  drawArcs(green, red, black, maxR * 0.8);
  drawArcs(cream, blue, white, maxR * 0.75);
  drawArcs(green, red, black, maxR * 0.45);
  drawArcs(cream, blue, white,  maxR * 0.4);
  // BLANK[1] (hint: drawArcs x 3, drawCircle x 1した)
  drawCircle(green, maxR * 0.1);
  drawCircle(red, maxR * 0.05);
  fill(black)
  ellipse (218, 85, 20, 20)
}

function drawCircle(c, r){
  const cx = width / 2; // 中心は (cx, cy)
  const cy = height / 2;
  fill(c);//これなに？→drawCircleのc。あとでそこに色を入れる
  ellipse(cx, cy, r, r);
}

function drawArcs(c1, c2, c3, r) {
  const cx = width / 2; // 中心は (cx, cy)
  const cy = height / 2;
  for (let i = 0; i < 20; i++) {
    let start = TWO_PI / 20 * i;//ここからわからへん。１つずつ進んでる。０から１，１から２
    let stop = TWO_PI / 20 * (i + 1);
  
    if(i % 3 == 0){
      fill(c1)
    }
    else if (i % 3 == 1){
      fill(c2)
    }
    else{
      fill(c3)
    }
    arc(cx, cy, r, r, start, stop, PIE);
  }
}

