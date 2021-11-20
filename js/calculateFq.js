const pi = 3.14159265358979;

//共通の値を取得する関数
function getValues() {
  // 実験回路の選択を取得(getLは関数リテラル)
  let getL = () => {
    let circuit = document.getElementById("circuit-select").value;
    return circuit == "A" ? 29.2 : 31.1;
  };
  let l = getL() * Math.pow(10, -3);
  //抵抗r1の値を取得
  let r1 = document.getElementById("r1Value").value;
  //抵抗rlの値を取得
  let rl = document.getElementById("rlValue").value;
  //コンデンサ容量を取得
  let c = document.getElementById("cValue").value * Math.pow(10, -9);
  //リストで返す
  return [l, r1, rl, c];
}

function calculateSeriesFq() {
  //共通の値を取得
  const [l, r1, rl, c] = getValues();
  //直列回路の共振周波数を計算する
  const seriesFq = 1 / (2 * pi * Math.sqrt(l * c));
  //innerTextでHTMLに表示する
  target = document.getElementById("seriesResult");
  target.innerText = seriesFq.toPrecision(6) + "Hz";
}

function calculateParallelFq() {
  //共通の値を取得
  const [l, r1, rl, c] = getValues();
  //可変抵抗の値を取得
  const r2 = document.getElementById("r2Value").value;
  //Rの計算
  const R = rl + r2;
  //f0の計算
  const parallelf0 = Math.sqrt(1 / (l * c) - (R * R) / (l * l)) / (2 * pi);
  const parallelfmin =
    Math.sqrt(
      Math.sqrt(1 + (2 * c * R * R) / l) / (l * c) - (R * R) / (l * l)
    ) /
    (2 * pi);
  target1 = document.getElementById("parallelF0Result");
  target2 = document.getElementById("parallelFminResult");
  target1.innerText = parallelf0.toPrecision(6) + "Hz";
  target2.innerText = parallelfmin.toPrecision(6) + "Hz";
}
