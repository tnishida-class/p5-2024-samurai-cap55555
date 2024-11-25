// テキスト「二重ループ」
// 「偶数『行』の四角形の色を変える」パターン
// 練習：「偶数『列』の四角形の色を変える」パターンに変えてみましょう
function setup(){
  createCanvas(100, 100);
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
      fill(j % 2 == 0 ? 25 : 0); // ここを変えます
      console.log(i, j);
      rect(i * 10, j * 10, 5, 5);
    }
  }
}
