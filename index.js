let canvasWidth = 100;
let canvasHeight = 100;
let uploadImgSrc;

function loadLocalImage(e) {
  let canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // ファイル情報を取得
  let fileData = e.target.files[0];

  // FileReaderオブジェクトを使ってファイル読み込み
  let reader = new FileReader();
  // ファイル読み込みに成功したときの処理
  reader.onload = function () {
    // Canvas上に表示する
    uploadImgSrc = reader.result;
    canvasDraw();
  };
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}

// Canvas上に画像を表示する
function canvasDraw() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  // canvas内の要素をクリアする
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Canvas上に画像を表示
  let img = new Image();
  img.src = uploadImgSrc;
  img.onload = function () {
    ctx.drawImage(
      img,
      0,
      0,
      canvasWidth,
      this.height * (canvasWidth / this.width)
    );
  };
}

function readQR() {
  let result = document.getElementById("result")
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  var code = jsQR(imageData.data, imageData.width, imageData.height);
  console.log(code)
  if (!code){
    result.textContent = "QRコードが存在しません"
  }else{
    result.textContent = code.data
  }
}
